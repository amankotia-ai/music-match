# AA music

An iPod Classic emulator for the web. The phone screen becomes the iPod: spin the click wheel, browse Cover Flow, hear 30-second previews, and press ⏯ to open the song in Spotify.

## Features

- **Click wheel** — circular drag scrolling with acceleration, clicker ticks, MENU/skip/play zones, center-button select
- **Cover Flow** — 3D flowing album art, the default home screen
- **Mood quadrant** — hold the center button for 1.2s and the wheel becomes a four-mood picker (Intense / Hype / Melancholy / Chill); drop the puck on a mood to get a Cover Flow of songs tagged with it
- **Spotify handoff** — ⏯ deep-links the current song into the Spotify app (verified track IDs)
- **Previews** — 30-second clips fetched from the iTunes Search API (no auth, JSONP)

## Run it

Any static server works:

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173. On a phone, add it to your home screen for the full-bleed look.

## Add songs

Append to `LIBRARY` in `app.js` with a `mood` tag (`hype` / `intense` / `blue` / `chill`). Find the Spotify track ID from the song's share link, and verify it (plus grab artwork) via the public oEmbed endpoint:

```
https://open.spotify.com/oembed?url=https://open.spotify.com/track/<id>
```

Tracks without a `spotifyId` fall back to opening a Spotify search, and get generated vinyl artwork if `art` is missing.

No build step, no dependencies — three files of vanilla HTML/CSS/JS.
