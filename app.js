/* ==========================================================================
   MusicMatch — iPod Classic emulator
   Wheel navigation + Spotify deep links + 30s previews (iTunes JSONP)
   ========================================================================== */

'use strict';

/* ---------------------------------------------------------------- library */
/* Spotify IDs and artwork URLs verified via Spotify's public oEmbed API.  */

const LIBRARY = [
  { title: 'Love Sick Doctor', artist: 'Thunder Jackson', album: 'Thunder Jackson', v: 0.6, e: 0.7, spotifyId: '356IPNZVio2kmkIS1VdvLi', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0259e532675eefa84e47b00025' },
  { title: 'All In Due Time', artist: 'Snazzy', album: 'All In Due Time', v: 0.4, e: -0.3, spotifyId: '7x2oEbzj8lnOv5QpEGvrtR', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c78f374b0355f6f204571ae8' },
  { title: 'All Your\'n', artist: 'Martin Bandz', album: 'All Your\'n', v: 0.5, e: -0.4, spotifyId: null, art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f8/c5/f6/f8c5f62b-999f-d243-69ee-440c5afd579d/artwork.jpg/600x600bb.jpg' },
  { title: 'White Ferrari', artist: 'Frank Ocean', album: 'Blonde', v: -0.7, e: -0.8, spotifyId: '2LMkwUfqC6S6s6qDVlEuzV', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c5649add07ed3720be9d5526' },
  { title: 'Fool', artist: 'Bay Ledges', album: 'Rivers', v: 0.6, e: 0.1, spotifyId: '6tdjyoaesC0pXHA7QD8oEw', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02533c186aef4b1b2c8417b725' },
  { title: 'Trade Places', artist: 'Jack Harlow', album: 'Monica', v: 0.5, e: 0.5, spotifyId: '3yBI1IVune0k7Tsmcy8BVh', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0231646844acc328f1aac59fea' },
  { title: 'Frisky', artist: 'Dominic Fike', album: 'Sunburn', v: 0.7, e: 0.6, spotifyId: '3my33XXLpYUzVEeLOyftV2', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025b26c1b56d89c1416d21db60' },
  { title: 'Self Aware', artist: 'Temper City', album: 'Self Aware', v: 0.2, e: 0.7, spotifyId: '4qW3BbQAwZsrnu8a3ZRdyT', art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d6c26d2ae723f7ab553d64cc' },
  { title: 'Tell Me Why', artist: 'Gotts Street Park, Olive Jones', album: 'On the Inside', v: -0.5, e: -0.5, spotifyId: '4sX0BKWqewRYH8OArRUplH', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b1f08baf7d77100c632dcee1' },
  { title: 'A Different Age', artist: 'Current Joys', album: 'A Different Age', v: -0.6, e: 0.0, spotifyId: '5iMXCDWA4FxPNcOnq0HrpJ', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02df7a61e9fdf9fec7df7bd72a' },
  { title: 'Float', artist: 'Olivia Dean', album: 'Growth', v: 0.7, e: -0.1, spotifyId: '031T6v4JIcPlkbzOrpzOnv', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a67c5c1aa5192977c669a736' },
  { title: 'Radio', artist: 'Martin Bandz', album: 'Radio', v: 0.3, e: -0.2, spotifyId: '4HExgkLGWkbiD5QDohGE4M', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e9b45bcdea4dfbd0e1ecd308' },
  { title: 'Woman', artist: 'Mumford & Sons', album: 'Delta', v: -0.3, e: 0.6, spotifyId: '47DKI4RxI8ZW0sBqDenMhO', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c07c58c03363c8125d9eb18d' },
  { title: 'Take Me To Church', artist: 'Bossa Nova Covers, Mats & My', album: 'Take Me To Church', v: 0.3, e: -0.6, spotifyId: null, art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d0/64/79/d06479ef-8209-bb3d-2a44-988133b7672c/196874102589.jpg/600x600bb.jpg' },
  { title: 'Earrings', artist: 'Malcolm Todd', album: 'Sweet Boy', v: 0.2, e: 0.2, spotifyId: '0eAuGrXyGFYwur9ARUe7LJ', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022c1f34ecc1929fb59908aad1' },
  { title: 'You Don\'t Know', artist: 'Lucas Home', album: 'You Don\'t Know', v: -0.4, e: 0.5, spotifyId: '6Zamn1OL7XnnWWcwMLLp4S', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0212f7671df38248a3d773fe99' },
  { title: 'Know That You Know', artist: 'Patrick Watson', album: 'Love Songs for Robots', v: -0.4, e: -0.7, spotifyId: '6DYiTO8Y7o4SDu1zJz11lC', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e021262148686292d69ad6ceb03' },
  { title: 'Feeling For You', artist: 'Milky Chance', album: 'Living in a Haze', v: 0.6, e: 0.5, spotifyId: '1BSTT3sbQ1MVVacApHilK9', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0284e9e803499a83ff405f8034' },
  { title: 'WAR', artist: 'Kal Mackane', album: 'WAR', v: -0.6, e: 0.8, spotifyId: null, art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/30/49/c8/3049c80f-d996-4cf0-bf87-843f9e67e499/822299653398.png/600x600bb.jpg' },
  { title: 'F-Stop Blues', artist: 'Jack Johnson', album: 'Brushfire Fairytales (Remastered) [Bonus Version]', v: 0.5, e: -0.5, spotifyId: '3EBexE2FduUQV8urHDGVZ5', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b8ef03bd9dd5ac6e7dc112df' },
  { title: 'Rodeo Clowns', artist: 'Jack Johnson', album: 'On and On', v: 0.4, e: 0.0, spotifyId: '2Z0Devr3hrO8bDUvhRIMh8', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e024a25251f8c645064ebdec45b' },
  { title: 'Tomorrow Morning', artist: 'Jack Johnson', album: 'On and On', v: 0.3, e: -0.6, spotifyId: '7nSP35TXXGW3fYlICWR8cx', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f16dd423cb90469fb43af08c' },
  { title: 'Thinking About You', artist: 'Norah Jones', album: 'Not Too Late', v: 0.1, e: -0.6, spotifyId: '0Dpf33TLqUMr4Vlbx5dUw4', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02df3bee99d02e42d71d3a5a4a' },
  { title: 'Seven Nation Army', artist: 'Laza Bossa', album: 'Seven Nation Army', v: 0.1, e: -0.3, spotifyId: '5nfbAsIImqdWx2PrR0ORsk', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025e2fe8b671a9bb9d56238c45' },
  { title: 'Set My Baby Free', artist: 'Ian Brown', album: 'Golden Greats', v: 0.5, e: 0.6, spotifyId: '4NQ2SSyEWA3PDOZy6Uchuu', art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c1c8863d22e647739aa00cf3' },
  { title: 'Darlin\'', artist: 'Jean Dawson', album: 'Glimmer of God', v: -0.3, e: 0.2, spotifyId: '3lFVdFLQeBXLxqKxqwqIfS', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0260cac8c2d78f2c4e45f10c37' },
  { title: 'Lovelovelove', artist: 'Flea', album: 'Helen Burns', v: 0.4, e: -0.2, spotifyId: '4zT2e0Y4whBSvuKzJaChbd', art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02fbf31b88d570149278959081' },
  { title: 'Thank You', artist: 'LEMFRECK', album: 'Thank You', v: 0.6, e: 0.4, spotifyId: '72nNfdADuOnTeIFPpwabIG', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e7ed575662fb077ca397ee24' },
  { title: 'Honey', artist: 'Andrew Kamen', album: 'Honey', v: 0.5, e: -0.4, spotifyId: '0QJEOYPUMlPiMbdAUngD9e', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02835ed61222ada9a8182d0d76' },
  { title: 'Giving It In', artist: 'Faye Meana', album: 'Giving It In', v: -0.4, e: -0.4, spotifyId: '19aWApe8dVKOh3klNoje6y', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02560c55ee8bf3653aa6a3f609' },
  { title: 'Red Hearts', artist: 'Marlon Funaki', album: 'Red Hearts', v: -0.5, e: -0.2, spotifyId: '7aU8ycwySg1LQAuCKgr3z9', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023305de5b7821aa9570c0b73b' },
  { title: 'The Way I Love You - Acoustic', artist: 'Jorja Smith', album: 'The Way I Love You', v: -0.2, e: -0.7, spotifyId: '2a1YoHUcoZeQMCDT5jIRMr', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f71728fad7034c20bd3d893a' },
  { title: 'Run Away', artist: 'Chezile', album: '47', v: -0.6, e: -0.3, spotifyId: '6doY5sLPHdE4g7RUQdYSz6', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e9387414fb13819654912c8e' },
  { title: 'Heart To Heart', artist: 'Mac DeMarco', album: 'Here Comes the Cowboy', v: 0.0, e: -0.8, spotifyId: '7EAMXbLcL0qXmciM5SwMh2', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022866217fb30f5428cd77fde4' },
  { title: 'Tender love', artist: 'Mounika., Ocie Elliott', album: 'I Need Space', v: 0.3, e: -0.7, spotifyId: '60GK9ifHXOrJXJq46lwILc', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f64d68a9061b3bc89a918c35' },
  { title: 'Show Me How', artist: 'Men I Trust', album: 'Show Me How', v: 0.1, e: -0.4, spotifyId: '75IQVo8hqI1iwVZyvkN2VT', art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02deeb617204bc14f4ee87b057' },
  { title: 'Dirty Love', artist: 'Mt. Joy', album: 'Mt. Joy', v: 0.6, e: 0.3, spotifyId: '6bON0csSf7G4LDsUrBwQ54', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0231e4ef69237ca7ffbecda485' },
  { title: 'Sea Gets Hotter', artist: 'Durand Jones & The Indications', album: 'American Love Call', v: -0.1, e: -0.5, spotifyId: '5ZK62nSchTamBy8F6HIZov', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028deec279b07d5a628aca1ea3' },
  { title: 'Daughter of the Sun', artist: 'vbnd, Katie Tupper, Justice Der', album: 'Daughter of the Sun', v: 0.4, e: -0.5, spotifyId: '6CXkN8hknWTqYpI5K5ljOl', art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0232175dbb68c3f1864f4f34d0' },
];

/* the mood plane — valence (x, sad to happy) by energy (y, calm to charged).
   8 named regions: the 4 corners plus blend names on the axes.            */
function blendAt(v, e) {
  const ang = Math.atan2(e, v) * 180 / Math.PI;
  if (ang >= -22.5 && ang < 22.5)   return { label: 'Golden',      color: '#e0a83c' };
  if (ang >= 22.5 && ang < 67.5)    return { label: 'Hype',        color: '#ef9a2d' };
  if (ang >= 67.5 && ang < 112.5)   return { label: 'Charged',     color: '#d97435' };
  if (ang >= 112.5 && ang < 157.5)  return { label: 'Intense',     color: '#c8483c' };
  if (ang >= 157.5 || ang < -157.5) return { label: 'Heavy Heart', color: '#7a5670' };
  if (ang >= -157.5 && ang < -112.5) return { label: 'Melancholy', color: '#47649f' };
  if (ang >= -112.5 && ang < -67.5) return { label: 'Late Night',  color: '#3f7a8c' };
  return { label: 'Chill', color: '#35a869' };
}

/* -------------------------------------------------------------- utilities */

const $ = (sel) => document.querySelector(sel);
const uniq = (arr) => [...new Set(arr)];

/* vinyl-style placeholder for tracks without artwork */
function artFor(t) {
  if (t.art) return t.art;
  if (!t._genArt) {
    const initials = t.title.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#26282b"/>
      <circle cx="60" cy="60" r="44" fill="#1a1b1e" stroke="#3a3d41" stroke-width="2"/>
      <circle cx="60" cy="60" r="30" fill="none" stroke="#33363a" stroke-width="1"/>
      <circle cx="60" cy="60" r="15" fill="#c6c8cc"/>
      <text x="60" y="65" text-anchor="middle" font-family="Helvetica, Arial" font-size="13" font-weight="bold" fill="#26282b">${initials}</text>
    </svg>`;
    t._genArt = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  return t._genArt;
}

function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* 30-second previews come from the iTunes Search API via JSONP
   (the endpoint has no CORS headers, JSONP works from any static page). */
const previewCache = {};
function fetchPreview(track) {
  const key = track.spotifyId;
  if (previewCache[key]) return previewCache[key];
  previewCache[key] = new Promise((resolve) => {
    const cb = `__mm_cb_${key.replace(/[^a-zA-Z0-9]/g, '')}`;
    const term = encodeURIComponent(`${track.title} ${track.artist}`);
    const script = document.createElement('script');
    const cleanup = () => { delete window[cb]; script.remove(); };
    window[cb] = (data) => {
      cleanup();
      const hit = data && data.results && data.results[0];
      resolve(hit && hit.previewUrl ? hit.previewUrl : null);
    };
    script.onerror = () => { cleanup(); resolve(null); };
    script.src = `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1&callback=${cb}`;
    document.head.appendChild(script);
  });
  return previewCache[key];
}

/* ------------------------------------------------------------ wheel sound */

let audioCtx = null;
function tick() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // the iPod clicker: a tiny, dry, high-pitched tick with an instant decay
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2700, t0);
    osc.frequency.exponentialRampToValueAtTime(950, t0 + 0.011);
    gain.gain.setValueAtTime(0.09, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.014);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.016);
  } catch (e) { /* audio not available yet — fine */ }
}

/* ---- mobile audio unlock ----------------------------------------------
   iOS mutes WebAudio while the ringer switch is on silent (it runs in the
   "ambient" audio session) and only unlocks audio inside a real touch
   gesture. Playing a looping *silent* <audio> element flips the session to
   "playback", which lets the clicker tick and previews play regardless.  */

function silentWav(seconds = 0.4) {
  const rate = 8000;
  const n = Math.floor(rate * seconds);
  const bytes = new Uint8Array(44 + n * 2);
  const dv = new DataView(bytes.buffer);
  const w = (off, s) => { for (let i = 0; i < s.length; i++) bytes[off + i] = s.charCodeAt(i); };
  w(0, 'RIFF'); dv.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt ');
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
  dv.setUint32(24, rate, true); dv.setUint32(28, rate * 2, true);
  dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
  w(36, 'data'); dv.setUint32(40, n * 2, true);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return 'data:audio/wav;base64,' + btoa(bin);
}

const SILENT_SRC = silentWav();
const keepalive = new Audio(SILENT_SRC);
keepalive.loop = true;
keepalive.setAttribute('playsinline', '');

let audioUnlocked = false;
function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (audioUnlocked) return;
    audioUnlocked = true;

    // one silent WebAudio buffer inside the gesture unlocks the context
    const buf = audioCtx.createBuffer(1, 1, 22050);
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(audioCtx.destination);
    src.start(0);

    // silent loop keeps the session in "playback" (ignores the mute switch)
    keepalive.play().catch(() => { audioUnlocked = false; });

    // bless the preview element so play() works after async preview fetches
    if (!player.audio.src) {
      player.audio.src = SILENT_SRC;
      player.audio.play().then(() => {
        player.audio.pause();
        player.audio.removeAttribute('src');
      }).catch(() => {});
    }
  } catch (e) {}
}
['pointerdown', 'pointerup', 'touchend', 'keydown'].forEach((evt) =>
  document.addEventListener(evt, unlockAudio, { passive: true })
);

/* ------------------------------------------------------------ player state */

const spotOK = () => typeof Spot !== 'undefined' && Spot.connected();

const player = {
  audio: new Audio(),
  queue: [],
  index: -1,
  playing: false,
  mode: 'preview',            // 'preview' (30s clip) | 'pending' | 'spotify' (full track)
  deviceHint: false,          // connected but no active Spotify device found
  progressMs: 0,              // last known Spotify position, for seamless recovery

  get track() { return this.queue[this.index] || null; },

  async load(queue, index, autoplay = true) {
    this.queue = queue;
    this.index = index;
    this.audio.pause();
    this.playing = false;
    this.mode = 'preview';
    this.deviceHint = false;
    this.progressMs = 0;
    updateStatusIcon();
    const track = this.track;
    if (!track) return;

    // full-track playback through the user's Spotify device
    if (autoplay && spotOK() && track.spotifyId) {
      this.mode = 'pending';                   // don't show preview timings while syncing
      const played = await this.playViaSpotify(track);
      if (played || track !== this.track) return;
      this.mode = 'preview';
    }

    // 30-second preview fallback
    const url = await fetchPreview(track);
    if (track !== this.track) return;          // user skipped meanwhile
    track.previewUrl = url;
    if (url && autoplay) {
      this.audio.src = url;
      this.audio.play().then(() => {
        this.playing = true;
        updateStatusIcon();
      }).catch(() => {});
    }
    renderIfNowPlaying();
  },

  async playViaSpotify(track, positionMs = 0) {
    const withIds = this.queue.filter((t) => t.spotifyId);
    const uris = withIds.map((t) => 'spotify:track:' + t.spotifyId);
    try {
      await Spot.playTracks(uris, withIds.indexOf(track), positionMs);
      if (track !== this.track) return true;
      this.audio.pause();                      // preview stops the moment sync starts
      this.mode = 'spotify';
      this.deviceHint = false;
      this.playing = true;
      updateStatusIcon();
      startNpPoll();
      renderIfNowPlaying();
      return true;
    } catch (e) {
      if (e.code === 'NO_DEVICE') {
        this.deviceHint = true;
        watchForDevice(track);                 // auto-sync as soon as Spotify wakes
      }
      return false;                            // fall back to the preview
    }
  },

  toggle() {
    if (this.mode === 'spotify') {
      if (this.playing) {
        this.playing = false;
        updateStatusIcon();
        Spot.pause().catch(() => {});
        return;
      }
      // resume, with a recovery ladder for suspended devices / lost context
      this.playing = true;
      updateStatusIcon();
      const track = this.track;
      Spot.resume().catch(async () => {
        const ok = await this.playViaSpotify(track, this.progressMs || 0).catch(() => false);
        if (!ok && track === this.track) {
          this.playing = false;
          updateStatusIcon();
          if (this.deviceHint) push(deviceWaitView());
        }
      });
      return;
    }
    if (!this.audio.src) return;
    if (this.audio.paused) { this.audio.play().catch(() => {}); this.playing = true; }
    else { this.audio.pause(); this.playing = false; }
    updateStatusIcon();
  },

  step(dir) {
    if (!this.queue.length) return;
    this.load(this.queue, (this.index + dir + this.queue.length) % this.queue.length);
  },

};

/* ---- guided play states -------------------------------------------------
   The play button never deep-links away anymore. It resolves the current
   state and either toggles playback or walks the user to the fix.        */

function playPressed() {
  if (player.mode === 'spotify' && player.track) {
    player.toggle();                                     // synced: real play/pause
    return;
  }
  if (player.mode === 'pending') return;                 // sync already in flight
  if (!spotOK()) {
    push(connectSpotifyView());                          // guide: connect first
    return;
  }
  if (player.track) {
    if (player.deviceHint) push(deviceWaitView());       // guide: wake Spotify
    else player.playViaSpotify(player.track).then((ok) => {
      if (!ok && player.deviceHint) push(deviceWaitView());
    });
    return;
  }
  push(nowPlayingView());                                // nothing selected yet
}

/* poll for a Spotify device and start full playback the moment one exists */
let deviceWatch = null;
function watchForDevice(track) {
  clearInterval(deviceWatch);
  let tries = 0;
  deviceWatch = setInterval(async () => {
    tries++;
    if (tries > 20 || !spotOK() || player.track !== track || player.mode === 'spotify') {
      clearInterval(deviceWatch);
      return;
    }
    const played = await player.playViaSpotify(track).catch(() => false);
    if (played && player.mode === 'spotify') {
      clearInterval(deviceWatch);
      if (topView() && topView().isDeviceWait) popView(); // dismiss the guide
      renderIfNowPlaying();
    }
  }, 4000);
}

function connectSpotifyView() {
  const v = stubView('Spotify', '🎧', 'Connect Spotify',
    'Full songs play through your Spotify app.<br><br>Press the <b>centre button</b> to connect.<br>Until then you get 30s previews.');
  v.onSelect = () => { if (typeof Spot !== 'undefined') Spot.login(); };
  return v;
}

function deviceWaitView() {
  const v = stubView('Spotify', '📱', 'Wake up Spotify',
    'No active Spotify device found.<br><br>Press the <b>centre button</b> to open Spotify,<br>then come back — playback starts by itself.');
  v.isDeviceWait = true;
  v.onSelect = () => {
    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (ios) location.href = 'spotify://';               // wake the app
    else window.open('https://open.spotify.com', '_blank'); // web player = a device
  };
  if (player.track) watchForDevice(player.track);
  return v;
}

player.audio.setAttribute('playsinline', '');

player.audio.addEventListener('timeupdate', () => {
  const fill = $('#npBarFill');
  if (!fill || !player.audio.duration) return;
  fill.style.width = `${(player.audio.currentTime / player.audio.duration) * 100}%`;
  const el = $('#npElapsed'), rm = $('#npRemain');
  if (el) el.textContent = fmtTime(player.audio.currentTime);
  if (rm) rm.textContent = `-${fmtTime(player.audio.duration - player.audio.currentTime)}`;
});
player.audio.addEventListener('ended', () => { if (player.mode !== 'spotify') player.step(1); });

/* poll the Spotify player while in remote mode: real progress, play state,
   and auto-advance detection (Spotify moves through the queue on its own) */
let npPoll = null;
async function pollSpotifyOnce() {
  if (player.mode !== 'spotify') { clearInterval(npPoll); return; }
  if (document.hidden) return;
  let s;
  try { s = await Spot.state(); } catch (e) { return; }
  if (!s || !s.item) {
    // 204 = Spotify has gone quiet (suspended while paused). Show paused —
    // the toggle's recovery ladder brings it back from player.progressMs.
    if (player.playing) { player.playing = false; updateStatusIcon(); }
    return;
  }
  player.progressMs = s.progress_ms || 0;
  if (player.playing !== s.is_playing) {
    player.playing = s.is_playing;
    updateStatusIcon();
  }
  if (player.track && player.track.spotifyId !== s.item.id) {
    const i = player.queue.findIndex((t) => t.spotifyId === s.item.id);
    if (i >= 0) { player.index = i; renderIfNowPlaying(); }
  }
  const fill = $('#npBarFill');
  if (fill && s.item.duration_ms) {
    fill.style.width = `${(s.progress_ms / s.item.duration_ms) * 100}%`;
    const el = $('#npElapsed'), rm = $('#npRemain');
    if (el) el.textContent = fmtTime(s.progress_ms / 1000);
    if (rm) rm.textContent = `-${fmtTime((s.item.duration_ms - s.progress_ms) / 1000)}`;
  }
}
function startNpPoll() {
  clearInterval(npPoll);
  pollSpotifyOnce();                 // immediate: real duration shows right away
  npPoll = setInterval(pollSpotifyOnce, 1000);
}

/* ---- returning to the app: adopt whatever Spotify is doing -------------
   Runs on reopen/focus/boot. If Spotify advanced through the queue, was
   paused, or is playing something started elsewhere, the iPod mirrors it. */
let lastSyncAt = 0;
async function syncFromSpotify() {
  if (!spotOK() || player.mode === 'pending') return;
  const now = Date.now();
  if (now - lastSyncAt < 1500) return;           // focus+visibility fire together
  lastSyncAt = now;

  let s;
  try { s = await Spot.state(); } catch (e) { return; }
  if (!s || !s.item) {
    if (player.mode === 'spotify' && player.playing) {
      player.playing = false;
      updateStatusIcon();
    }
    return;
  }

  const id = s.item.id;
  if (player.mode === 'spotify' && player.track && player.track.spotifyId === id) {
    player.playing = s.is_playing;               // same song — refresh state only
    player.progressMs = s.progress_ms || 0;
    updateStatusIcon();
    renderIfNowPlaying();
    return;
  }

  // adopt: find the song in the current queue or the library…
  let queue = player.queue.some((t) => t.spotifyId === id) ? player.queue : LIBRARY;
  let index = queue.findIndex((t) => t.spotifyId === id);
  if (index < 0) {                               // …or mirror an outside track
    const img = s.item.album && s.item.album.images && s.item.album.images[0];
    queue = [{
      title: s.item.name,
      artist: (s.item.artists || []).map((a) => a.name).join(', '),
      album: (s.item.album && s.item.album.name) || '',
      spotifyId: id,
      art: img ? img.url : null,
    }];
    index = 0;
  }
  player.audio.pause();
  player.queue = queue;
  player.index = index;
  player.mode = 'spotify';
  player.deviceHint = false;
  player.playing = s.is_playing;
  player.progressMs = s.progress_ms || 0;
  updateStatusIcon();
  startNpPoll();
  renderIfNowPlaying();
}

document.addEventListener('visibilitychange', () => { if (!document.hidden) syncFromSpotify(); });
window.addEventListener('focus', () => syncFromSpotify());
window.addEventListener('pageshow', () => syncFromSpotify());

/* ---------------------------------------------------------------- views */

/* Each view: { type, title, items?, render? }.
   Navigation is a stack; MENU pops, center pushes/acts. */

const viewStack = [];
const selections = new Map();   // remember cursor position per view title

function makeSongItems(tracks) {
  return tracks.map((t) => ({
    label: t.title,
    track: t,
    action: () => {
      player.load(tracks, tracks.indexOf(t));
      push(nowPlayingView());
    },
  }));
}

function listView(title, items, opts = {}) {
  return { type: 'list', title, items, ...opts };
}

function stubView(title, icon, text, sub) {
  return {
    type: 'stub', title,
    render: (el) => {
      el.innerHTML = `<div class="stub"><div class="stub-icon">${icon}</div><p>${text}</p><small>${sub}</small></div>`;
    },
  };
}

function nowPlayingView() {
  return { type: 'nowplaying', title: 'Now Playing' };
}

function coverFlowView(tracks = LIBRARY, title = 'AA music') {
  return { type: 'coverflow', title, tracks, cfIndex: 0 };
}

function mainMenuView() {
  return listView("Aditi's iPod", [
    { label: 'Music', action: () => push(musicMenuView()) },
    { label: 'Videos', action: () => push(stubView('Videos', '🎬', 'No Videos', 'This iPod only does one thing —<br>and it does it well.')) },
    { label: 'Photos', action: () => push(stubView('Photos', '🖼️', 'No Photos', 'Imagine your 2008 camera roll here.')) },
    { label: 'Podcasts', action: () => push(stubView('Podcasts', '🎙️', 'No Podcasts', 'Serial wasn’t even out yet.')) },
    { label: 'Extras', action: () => push(stubView('Extras', '🧱', 'Extras', 'Solitaire, Vortex and Brick<br>are on a coffee break.')) },
    { label: 'Settings', action: () => push(settingsView()) },
    { label: 'Shuffle Songs', action: shuffleAll },
    { label: 'Now Playing', action: () => { if (player.track) push(nowPlayingView()); } },
  ], { split: true });
}

function musicMenuView() {
  return listView('Music', [
    { label: 'All Songs', action: () => push(coverFlowView(LIBRARY, 'All Songs')) },
    { label: 'Artists', action: () => push(artistsView()) },
    { label: 'Albums', action: () => push(albumsView()) },
  ]);
}

function artistsView() {
  const artists = uniq(LIBRARY.map((t) => t.artist)).sort();
  return listView('Artists', artists.map((a) => ({
    label: a,
    action: () => push(listView(a, makeSongItems(LIBRARY.filter((t) => t.artist === a)))),
  })));
}

function albumsView() {
  const albums = uniq(LIBRARY.map((t) => t.album)).sort();
  return listView('Albums', albums.map((a) => ({
    label: a,
    action: () => push(listView(a, makeSongItems(LIBRARY.filter((t) => t.album === a)))),
  })));
}

function settingsView() {
  return listView('Settings', [
    {
      label: spotOK() ? 'Disconnect Spotify' : 'Connect Spotify',
      action: () => {
        if (typeof Spot === 'undefined') return;
        if (Spot.connected()) {
          Spot.logout();
          viewStack.pop();
          push(settingsView());     // re-render with the new label
        } else {
          Spot.login();             // redirects to Spotify's consent page
        }
      },
    },
    { label: 'About', action: () => push(aboutView()) },
  ]);
}

function aboutView() {
  return stubView('About', '⚙️', 'AA music',
    `${LIBRARY.length} songs · previews via iTunes<br>full songs open in Spotify<br><br>Songs ${LIBRARY.length} &nbsp; Capacity 160GB (lol)`);
}

function shuffleAll() {
  const shuffled = [...LIBRARY].sort(() => Math.random() - 0.5);
  player.load(shuffled, 0);
  push(nowPlayingView());
}

/* --------------------------------------------------------------- render */

const screenContent = $('#screenContent');
const statusTitle = $('#statusTitle');

function topView() { return viewStack[viewStack.length - 1]; }
function cursor() { return selections.get(topView()) || 0; }
function setCursor(i) { selections.set(topView(), i); }

const VISIBLE_ROWS = 8;

function updateStatusIcon() {
  const el = $('#statusPlayIcon');
  if (!el) return;
  if (player.playing) {
    el.innerHTML = '<svg viewBox="0 0 10 12" width="9" height="11"><path d="M0 0 10 6 0 12z" fill="#3a4048"/></svg>';
  } else if (player.track) {
    el.innerHTML = '<svg viewBox="0 0 10 12" width="9" height="11"><g fill="#3a4048"><rect width="3.5" height="12"/><rect x="6.5" width="3.5" height="12"/></g></svg>';
  } else {
    el.innerHTML = '';
  }
}

let previewRotator = null;

function render(direction = 'push') {
  const view = topView();
  statusTitle.textContent = view.type === 'nowplaying' ? 'Now Playing' : view.title;
  clearInterval(previewRotator);

  const el = document.createElement('div');
  el.className = 'view' + (direction === 'pop' ? ' pop' : '');

  if (view.type === 'list') renderList(view, el);
  else if (view.type === 'nowplaying') renderNowPlaying(el);
  else if (view.type === 'coverflow') renderCoverFlow(view, el);
  else if (view.render) view.render(el);

  screenContent.replaceChildren(el);
  updateStatusIcon();
}

function renderList(view, el) {
  const sel = cursor();

  const list = document.createElement('div');
  list.className = 'menu-list';
  const scroller = document.createElement('div');
  scroller.className = 'menu-scroller';
  view.items.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'menu-row' + (i === sel ? ' selected' : '');
    row.innerHTML = `<span class="row-label">${item.label}</span><span class="chevron">&rsaquo;</span>`;
    row.addEventListener('click', () => { setCursor(i); updateListSelection(view); item.action(); });
    scroller.appendChild(row);
  });
  list.appendChild(scroller);
  el.appendChild(list);
  view.listEls = { list, scroller };
  if (view.scrollStart === undefined) view.scrollStart = 0;
  updateListSelection(view);   // set position before attach — no first-frame jump

  if (view.split) {
    const pane = document.createElement('div');
    pane.className = 'split-preview';
    const arts = uniq(LIBRARY.filter((t) => t.art).map((t) => t.art)).slice(0, 12);
    arts.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      if (i === 0) img.classList.add('show');
      pane.appendChild(img);
    });
    let idx = 0;
    previewRotator = setInterval(() => {
      const imgs = pane.querySelectorAll('img');
      if (!imgs.length) return;
      imgs[idx % imgs.length].classList.remove('show');
      idx++;
      imgs[idx % imgs.length].classList.add('show');
    }, 2600);
    el.appendChild(pane);
  }
}

function renderNowPlaying(el) {
  const t = player.track;
  if (!t) {
    el.innerHTML = '<div class="stub"><p>Nothing playing</p><small>Pick a song from Music &rsaquo; Songs</small></div>';
    return;
  }
  el.innerHTML = `
    <div class="now-playing">
      <div class="np-index">${player.index + 1} of ${player.queue.length}</div>
      <div class="np-body">
        <div class="np-art"><img src="${artFor(t)}" alt=""></div>
        <div class="np-meta">
          <div class="np-title">${t.title}</div>
          <div class="np-artist">${t.artist}</div>
          <div class="np-album">${t.album}</div>
          ${player.mode === 'spotify'
            ? '<span class="np-state"><i class="np-dot on"></i>Spotify</span>'
            : player.mode === 'pending'
              ? '<span class="np-state"><i class="np-dot wait"></i>syncing&hellip;</span>'
              : player.deviceHint
                ? '<span class="np-state"><i class="np-dot wait"></i>waiting for Spotify&hellip;</span>'
                : `<span class="np-state"><i class="np-dot"></i>preview &middot; &#9654;&#10073;&#10073; ${spotOK() ? 'full track' : 'connect Spotify'}</span>`}
        </div>
      </div>
      <div class="np-progress">
        <div class="np-bar"><div class="np-bar-fill" id="npBarFill"></div></div>
        <div class="np-times"><span id="npElapsed">0:00</span><span id="npRemain">${player.mode === 'preview' && t.previewUrl ? '-0:30' : ''}</span></div>
      </div>
    </div>`;
}

/* move the highlight / glide the list without re-rendering — this is what
   makes wheel scrolling feel like the real hardware. Percentage transforms
   need no measuring, so position is correct on the very first paint. */
function updateListSelection(view) {
  const els = view.listEls;
  if (!els) return;
  const sel = cursor();

  // classic windowing: the highlight roams; the list scrolls at the edges
  if (sel < view.scrollStart) view.scrollStart = sel;
  if (sel > view.scrollStart + VISIBLE_ROWS - 1) view.scrollStart = sel - VISIBLE_ROWS + 1;

  const rows = els.scroller.children;
  for (let i = 0; i < rows.length; i++) rows[i].classList.toggle('selected', i === sel);

  els.scroller.style.transform = `translateY(${-view.scrollStart * (100 / VISIBLE_ROWS)}%)`;
}

function renderIfNowPlaying() {
  if (topView() && topView().type === 'nowplaying') render();
}

function renderCoverFlow(view, el) {
  const cf = document.createElement('div');
  cf.className = 'coverflow';
  const stage = document.createElement('div');
  stage.className = 'cf-stage';

  view.tracks.forEach((t, i) => {
    const cover = document.createElement('div');
    cover.className = 'cf-cover';
    cover.dataset.i = i;
    cover.innerHTML = `<img src="${artFor(t)}" alt="">`;
    stage.appendChild(cover);
  });

  const caption = document.createElement('div');
  caption.className = 'cf-caption';
  cf.appendChild(stage);
  cf.appendChild(caption);
  el.appendChild(cf);

  view.layout = () => {
    const c = view.cfIndex;
    const spacing = Math.max(40, stage.clientWidth * 0.16);
    stage.querySelectorAll('.cf-cover').forEach((cover) => {
      const i = +cover.dataset.i;
      const d = i - c;
      if (Math.abs(d) > 3) { cover.style.opacity = 0; cover.style.transform = 'scale(.5)'; return; }
      cover.style.opacity = 1;
      if (d === 0) {
        cover.style.transform = 'translateZ(110px)';
        cover.style.zIndex = 10;
      } else {
        cover.style.transform =
          `translateX(${d * spacing}px) translateZ(0) rotateY(${d < 0 ? 55 : -55}deg)`;
        cover.style.zIndex = 10 - Math.abs(d);
      }
    });
    const t = view.tracks[c];
    caption.innerHTML = `<div class="cf-title">${t.title}</div><div class="cf-artist">${t.artist}</div>`;
  };
  view.layout();
}

/* ------------------------------------------------------------ navigation */

function push(view) {
  viewStack.push(view);
  if (!selections.has(view)) selections.set(view, 0);
  render('push');
}

function popView() {
  if (viewStack.length <= 1) return;
  viewStack.pop();
  render('pop');
}

function moveCursor(dir, count = 1) {
  const view = topView();
  if (view.type === 'coverflow') {
    const next = Math.min(view.tracks.length - 1, Math.max(0, view.cfIndex + dir * count));
    if (next !== view.cfIndex) {
      view.cfIndex = next;
      view.layout && view.layout();
      tick();
    }
    return;
  }
  if (view.type !== 'list') return;
  const next = Math.min(view.items.length - 1, Math.max(0, cursor() + dir * count));
  if (next !== cursor()) {
    setCursor(next);
    tick();
    updateListSelection(view);   // glide, don't re-render
  }
}

function selectCurrent() {
  const view = topView();
  if (view.onSelect) { view.onSelect(); return; }
  if (view.type === 'list') {
    const item = view.items[cursor()];
    if (item) item.action();
  } else if (view.type === 'coverflow') {
    player.load(view.tracks, view.cfIndex);
    push(nowPlayingView());
  } else if (view.type === 'nowplaying') {
    player.toggle();
  }
}

/* --------------------------------------------------------- click wheel */

const wheel = $('#wheel');
const centerBtn = $('#centerBtn');

const drag = { active: false, lastAngle: 0, accum: 0, moved: 0, startZone: null };

function angleAt(e) {
  const r = wheel.getBoundingClientRect();
  return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
}

function zoneAt(e) {
  const r = wheel.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  const dist = Math.hypot(dx, dy);
  if (dist < r.width * 0.19) return 'center';
  if (dist > r.width * 0.52) return null;
  const a = Math.atan2(dy, dx);                       // -PI..PI, 0 = right
  if (a > -2.36 && a <= -0.79) return 'menu';         // top
  if (a > -0.79 && a <= 0.79) return 'next';          // right
  if (a > 0.79 && a <= 2.36) return 'play';           // bottom
  return 'prev';                                      // left
}

const STEP = 0.24; // radians of rotation per menu step (~14° — fine, like the hardware)

wheel.addEventListener('pointerdown', (e) => {
  drag.active = true;
  drag.lastAngle = angleAt(e);
  drag.lastTime = performance.now();
  drag.accum = 0;
  drag.moved = 0;
  drag.startZone = zoneAt(e);
  try { wheel.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events have no pointerId */ }
});

wheel.addEventListener('pointermove', (e) => {
  if (!drag.active) return;
  const a = angleAt(e);
  let d = a - drag.lastAngle;
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d < -Math.PI) d += 2 * Math.PI;
  drag.lastAngle = a;
  drag.accum += d;
  drag.moved += Math.abs(d);

  // iPod-style acceleration: fast spins jump multiple rows per tick
  const now = performance.now();
  const dt = Math.max(8, now - drag.lastTime);
  drag.lastTime = now;
  const speed = Math.abs(d) / (dt / 1000);            // rad/s
  const mult = speed > 10 ? 3 : speed > 5.5 ? 2 : 1;

  while (drag.accum > STEP) { drag.accum -= STEP; moveCursor(1, mult); }
  while (drag.accum < -STEP) { drag.accum += STEP; moveCursor(-1, mult); }
});

wheel.addEventListener('pointerup', (e) => {
  if (!drag.active) return;
  drag.active = false;
  if (drag.moved < 0.18 && drag.startZone && drag.startZone === zoneAt(e)) {
    pressButton(drag.startZone);
  }
});

wheel.addEventListener('pointercancel', () => { drag.active = false; });

function pressButton(zone) {
  tick();
  switch (zone) {
    case 'center': selectCurrent(); break;
    case 'menu': popView(); break;
    case 'play': playPressed(); break;
    case 'next':
      if (topView().type === 'nowplaying') player.step(1); else moveCursor(1);
      break;
    case 'prev':
      if (topView().type === 'nowplaying') player.step(-1); else moveCursor(-1);
      break;
  }
}

/* --------------------------------------------------------- mood picker */
/* Hold the centre button for 2s: the wheel morphs into four mood
   quadrants. Drag the puck onto one and let go — Cover Flow opens with
   only the songs tagged to that mood. Dropping it back in the centre
   (or Escape) cancels.                                                  */

const device = $('#device');
const picker = $('#moodPicker');
const puck = $('#moodPuck');
const moodHintText = $('#moodHintText');
const moodHintDot = $('#moodHintDot');

const HOLD_MS = 1200;

const moodState = {
  active: false,
  dragging: false,
  blend: null,
  holdTimer: null,
  moved: 0,
  tapCancels: false,
  suppressClick: false,
};

function buzz(ms) {
  try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {}
}

function setPuck(dx, dy, animate = true) {
  puck.classList.toggle('no-anim', !animate);
  puck.style.transform = `translate(${dx}px, ${dy}px)`;
}

/* v/e are -1..1 plane coordinates; null clears the selection */
function setBlend(v, e) {
  if (v === null) {
    moodState.blend = null;
    moodHintText.textContent = 'How are you feeling?';
    moodHintDot.style.setProperty('background', '#9aa1aa');
    return;
  }
  const region = blendAt(v, e);
  const changed = !moodState.blend || moodState.blend.label !== region.label;
  moodState.blend = { v, e, label: region.label };
  if (changed) {
    moodHintText.textContent = region.label;
    moodHintDot.style.setProperty('background', region.color);
    tick();
    buzz(8);
  }
}

function enterMoodMode() {
  moodState.active = true;
  moodState.blend = null;
  moodState.moved = 0;
  setPuck(0, 0, false);
  setBlend(null);
  device.classList.add('mood-mode');
  tick();
  buzz(18);
}

function exitMoodMode() {
  moodState.active = false;
  moodState.dragging = false;
  device.classList.remove('mood-mode');
  setPuck(0, 0, true);
  // the post-hold click rarely lands on the centre button, so don't let a
  // stale suppress flag swallow the user's next real press
  setTimeout(() => { moodState.suppressClick = false; }, 80);
}

function commitBlend() {
  const b = moodState.blend;
  exitMoodMode();
  if (!b) return;
  tick();
  buzz(20);
  const dist = (t) => Math.hypot((t.v || 0) - b.v, (t.e || 0) - b.e);
  const ranked = [...LIBRARY].sort((a, c) => dist(a) - dist(c)).slice(0, 12);
  push(coverFlowView(ranked, b.label));
}

function movePuckToPointer(e) {
  const r = picker.getBoundingClientRect();
  const R = r.width / 2;
  let dx = e.clientX - (r.left + R);
  let dy = e.clientY - (r.top + R);
  const len = Math.hypot(dx, dy);
  moodState.moved = Math.max(moodState.moved, len);
  const maxLen = R * 0.60;
  if (len > maxLen) { dx *= maxLen / len; dy *= maxLen / len; }
  setPuck(dx, dy, false);
  if (len > R * 0.20) {
    setBlend(dx / maxLen, -dy / maxLen);   // screen-down = low energy
  } else {
    setBlend(null);
  }
}

/* drag sessions: either continuous from the 2s hold, or a fresh touch */
picker.addEventListener('pointerdown', (e) => {
  if (!moodState.active) return;
  moodState.dragging = true;
  moodState.moved = 0;
  moodState.tapCancels = true;      // a motionless tap in the centre cancels
  try { picker.setPointerCapture(e.pointerId); } catch (err) {}
  movePuckToPointer(e);
});

document.addEventListener('pointermove', (e) => {
  if (moodState.active && moodState.dragging) movePuckToPointer(e);
});

document.addEventListener('pointerup', () => {
  if (!moodState.active || !moodState.dragging) return;
  moodState.dragging = false;
  if (moodState.blend) { commitBlend(); return; }
  if (moodState.moved > 24 || (moodState.tapCancels && moodState.moved < 10)) {
    exitMoodMode();                 // dropped back in the centre, or tapped it
    return;
  }
  setPuck(0, 0, true);              // just lifted after the hold — stay open
});

/* centre button: quick press = select, 2s hold = mood picker */
centerBtn.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  if (moodState.active) return;
  moodState.holdTimer = setTimeout(() => {
    moodState.holdTimer = null;
    moodState.suppressClick = true;
    enterMoodMode();
    moodState.dragging = true;      // finger may still be down — keep dragging
    moodState.tapCancels = false;
  }, HOLD_MS);
});

const cancelHold = () => {
  if (moodState.holdTimer) { clearTimeout(moodState.holdTimer); moodState.holdTimer = null; }
};
centerBtn.addEventListener('pointerup', cancelHold);
centerBtn.addEventListener('pointercancel', cancelHold);
centerBtn.addEventListener('pointerleave', cancelHold);

centerBtn.addEventListener('click', () => {
  if (moodState.suppressClick) { moodState.suppressClick = false; return; }
  pressButton('center');
});

/* mouse wheel + trackpad over the device scrolls the menu */
let wheelBuffer = 0;
$('#device').addEventListener('wheel', (e) => {
  e.preventDefault();
  wheelBuffer += e.deltaY;
  while (wheelBuffer > 28) { wheelBuffer -= 28; moveCursor(1); }
  while (wheelBuffer < -28) { wheelBuffer += 28; moveCursor(-1); }
}, { passive: false });

/* keyboard */
document.addEventListener('keydown', (e) => {
  if (moodState.active) {
    const kb = moodState.kb || (moodState.kb = { x: 0, y: 0 });
    const aim = () => {
      const r = picker.getBoundingClientRect();
      const off = r.width * 0.26;   // keep the puck inside the circular clip
      setPuck(kb.x * off, kb.y * off, true);
      if (kb.x || kb.y) setBlend(kb.x, -kb.y);
      else setBlend(null);
    };
    const moodKeys = {
      ArrowUp: () => { kb.y = -1; aim(); },
      ArrowDown: () => { kb.y = 1; aim(); },
      ArrowLeft: () => { kb.x = -1; aim(); },
      ArrowRight: () => { kb.x = 1; aim(); },
      Enter: () => { if (moodState.blend) commitBlend(); },
      Escape: () => exitMoodMode(),
      Backspace: () => exitMoodMode(),
    };
    if (moodKeys[e.key]) { e.preventDefault(); moodKeys[e.key](); }
    return;
  }
  if (e.key === 'm' || e.key === 'M') { e.preventDefault(); moodState.kb = { x: 0, y: 0 }; enterMoodMode(); return; }
  const keys = {
    ArrowDown: () => moveCursor(1),
    ArrowUp: () => moveCursor(-1),
    ArrowRight: () => pressButton('next'),
    ArrowLeft: () => pressButton('prev'),
    Enter: () => pressButton('center'),
    Backspace: () => popView(),
    Escape: () => popView(),
    ' ': () => pressButton('play'),
  };
  if (keys[e.key]) { e.preventDefault(); keys[e.key](); }
});

/* ------------------------------------------------------------ idle clock */

const clockEl = $('#idleClock');
const IDLE_MS = 60000;
let idleTimer = null;
let clockTicker = null;

function drawClock() {
  const now = new Date();
  const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds();
  $('#clockHour').style.transform = `rotate(${h * 30 + m / 2}deg)`;
  $('#clockMin').style.transform = `rotate(${m * 6 + s / 10}deg)`;
  $('#clockSec').style.transform = `rotate(${s * 6}deg)`;
  $('#clockDate').textContent = now.toLocaleDateString(undefined,
    { weekday: 'long', month: 'short', day: 'numeric' });
  const t = player.track;
  $('#clockTrack').textContent = player.playing && t ? `♪ ${t.title} — ${t.artist}` : '';
}

function showClock() {
  if (moodState.active) { resetIdle(); return; }
  drawClock();
  clockEl.classList.add('show');
  clockTicker = setInterval(drawClock, 1000);
}

function hideClock() {
  clockEl.classList.remove('show');
  clearInterval(clockTicker);
}

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showClock, IDLE_MS);
}

/* the first touch only wakes the screen — it never triggers an action */
['pointerdown', 'keydown', 'wheel'].forEach((evt) =>
  document.addEventListener(evt, (e) => {
    if (clockEl.classList.contains('show')) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
      hideClock();
    }
    resetIdle();
  }, { capture: true })
);

resetIdle();

/* ------------------------------------------------------------------ boot */

push(mainMenuView());
push(coverFlowView());   // Cover Flow is the home screen; MENU backs into the menu

/* on boot, adopt any playback already in flight */
syncFromSpotify();

/* returning from the Spotify consent page? finish the token exchange */
if (typeof Spot !== 'undefined') {
  Spot.handleRedirect().then((wasRedirect) => {
    if (!wasRedirect) return;
    push(stubView('Spotify', Spot.connected() ? '✅' : '⚠️',
      Spot.connected() ? 'Spotify Connected' : 'Connection Failed',
      Spot.connected()
        ? 'Full songs now play through your<br>Spotify app. Pick a track!'
        : 'Try again from Settings &rsaquo; Connect Spotify.'));
  }).catch(() => {});
}
