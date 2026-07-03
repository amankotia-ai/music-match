/* ==========================================================================
   Spotify Connect integration — Authorization Code with PKCE, no backend.
   The app never plays Spotify audio itself; it remote-controls the user's
   active Spotify device (their phone / desktop app) via the Web API.
   ========================================================================== */

'use strict';

const Spot = (() => {
  const CLIENT_ID = 'd1b342836ebd4ebb86a706e0af60f2b8';
  const REDIRECT_URI = location.origin + '/';
  const SCOPES = 'user-read-playback-state user-modify-playback-state';
  const LS = { at: 'sp_access', rt: 'sp_refresh', exp: 'sp_expires', ver: 'sp_verifier' };

  const b64url = (buf) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  /* ---- auth ---- */

  async function login() {
    const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)).buffer);
    localStorage.setItem(LS.ver, verifier);
    const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    const p = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      scope: SCOPES,
    });
    location.href = 'https://accounts.spotify.com/authorize?' + p;
  }

  function saveTokens(d) {
    localStorage.setItem(LS.at, d.access_token);
    if (d.refresh_token) localStorage.setItem(LS.rt, d.refresh_token);
    localStorage.setItem(LS.exp, String(Date.now() + (d.expires_in - 60) * 1000));
  }

  async function tokenRequest(params) {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params),
    });
    if (!res.ok) throw new Error('token ' + res.status);
    return res.json();
  }

  /* returns true if this page load was an OAuth redirect */
  async function handleRedirect() {
    const code = new URLSearchParams(location.search).get('code');
    const denied = new URLSearchParams(location.search).get('error');
    if (!code && !denied) return false;
    if (code) {
      try {
        saveTokens(await tokenRequest({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: localStorage.getItem(LS.ver) || '',
        }));
      } catch (e) { console.warn('spotify auth failed', e); }
    }
    localStorage.removeItem(LS.ver);
    history.replaceState(null, '', location.pathname);
    return true;
  }

  async function getToken() {
    if (!localStorage.getItem(LS.rt)) return null;
    if (Date.now() < +localStorage.getItem(LS.exp) && localStorage.getItem(LS.at)) {
      return localStorage.getItem(LS.at);
    }
    try {
      const d = await tokenRequest({
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem(LS.rt),
        client_id: CLIENT_ID,
      });
      saveTokens(d);
      return d.access_token;
    } catch (e) {
      return null;
    }
  }

  const connected = () => !!localStorage.getItem(LS.rt);
  const logout = () => Object.values(LS).forEach((k) => localStorage.removeItem(k));

  /* ---- Web API ---- */

  async function api(method, path, body) {
    const token = await getToken();
    if (!token) { const e = new Error('NOT_CONNECTED'); e.code = 'NOT_CONNECTED'; throw e; }
    const res = await fetch('https://api.spotify.com/v1' + path, {
      method,
      headers: {
        Authorization: 'Bearer ' + token,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 204) return null;
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const e = new Error('API ' + res.status);
      e.status = res.status;
      e.reason = json && json.error && json.error.reason;
      throw e;
    }
    return json;
  }

  /* the Connect API needs an active device; find one to target if none is */
  async function anyDevice() {
    const d = await api('GET', '/me/player/devices');
    const devices = (d && d.devices) || [];
    return devices.find((x) => x.is_active) || devices[0] || null;
  }

  /* play `uris` starting at index `position`; queue continues on its own */
  async function playTracks(uris, position) {
    const body = { uris, offset: { position } };
    try {
      await api('PUT', '/me/player/play', body);
    } catch (e) {
      if (e.status !== 404) throw e;
      const dev = await anyDevice();                  // 404 = no active device
      if (!dev) { const err = new Error('NO_DEVICE'); err.code = 'NO_DEVICE'; throw err; }
      await api('PUT', '/me/player/play?device_id=' + encodeURIComponent(dev.id), body);
    }
  }

  const pause = () => api('PUT', '/me/player/pause');
  const resume = () => api('PUT', '/me/player/play');
  const state = () => api('GET', '/me/player');       // null when nothing active

  return { login, logout, connected, handleRedirect, playTracks, pause, resume, state };
})();
