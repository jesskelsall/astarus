# Guide to Stream Setup

This page serves as a single source of information on how I run Dungeons & Dragons sessions online. It should be specific enough to allow for setup from scratch if needed.

## Goals

I want to create an immersive D&D experience that is reminiscent of a Twitch stream:

- A voice and video call that facilitates playing the game.
- Ambient music that I control, but can be volume adjusted or muted by each player.
- During combat, a 3D battle map that gives the sense of the environment and the combatants.
- Information about the player characters and important NPCs.
- An initiative tower so players can see when their turn is approaching.

## Versions

There have been multiple revisions of the stream setup since I started running online games. This page only details the latest version.

| Version | Adoption | Features |
|:---:| --- | --- |
| V1 | TODO | Audio only recording via Audacity. |
| V2 | TODO | OBS setup for music and video recording. Two computers. |
| V3 | TODO | Addition of D&D UI. |
| V4 | January 2022 | Move to macOS, single computer. |

## Hardware Setup

While hardware doesn't play as large a role as software in the stream setup, the software used has been chosen for its macOS compatibility, so Apple hardware is required. Beyond that, having two 4K monitors makes a huge difference when juggling multiple applications.

| Type | Hardware | Spec | Notes |
| --- | --- | --- | --- |
| Computer | Apple MacBook Pro | 16" 2016, M1 Max, 32 GB | Probably overkill, any MacBook Pro will do. |
| Screens | Dell P2715Q (x2) | 27" 4K | High refresh rate not crucial. |
| Microphone | Blue Yeti | Yeticaster | Boom arm and shockmount heavily recommended.|
| Headphones | Sennheiser Momentum II | Wired ||
| Webcam | Elgato Facecam || Software required for 50Hz support. |

## Software Setup

### Discord

[Discord](https://discord.com/) is used as voice and video call software, allowing everyone at the table to hear and see each other, facilitating play.

Setting up a server allows the creation of channels (text and audio) for providing media in-session (name spellings, images etc.), as well as a voice channel that each session is ran in.

Discord's "Share Screen" functionality inside a voice channel allows an OBS window to be shared, allowing graphics and music to be seen by the players at the table.

### Spotify

[Spotify](https://www.spotify.com/uk/) is a music streaming service that contains a massive library of all sorts of music. Spotify audio is captured into OBS so it can be streamed into Discord.

By creating Spotify playlists for different types of ambiance and filling them with appropriate orchestral tracks, pressing play on a playlist can immediately set the mood.

For music not available through Spotify, it is possible to link local folders containing audio files to Spotify, allowing them to be added to playlists alongside Spotify music.

Here are my commonly used playlists:
- [D&D City](https://open.spotify.com/playlist/7se4hsdzZfGtUwO59iQN4B?si=cc02147dc55447dc)
- [D&D Combat](https://open.spotify.com/playlist/0WTGrQZjEWwOaHK0eFWQ0v?si=6a1f8da74695445b)
- [D&D Exploration](https://open.spotify.com/playlist/5lO1gQYd964LAgCP8Gfpoi?si=9dcf5325c43849c6)
- [D&D Inn](https://open.spotify.com/playlist/2hbL9My7spTvC5wDTqC751?si=dfd8810248194568)
- [D&D Night](https://open.spotify.com/playlist/6bExRG62nzP1eevqUju1IU?si=7b619effd354452a)
- [D&D Settlement](https://open.spotify.com/playlist/7jSQSytUwkzOZmhFfnro4S?si=0b481e87f6894ae9)

### Tabletop Simulator

[Tabletop Simulator](https://store.steampowered.com/app/286160/Tabletop_Simulator/) is a 3D virtual tabletop video game available on Steam. It is used to represent an initiative order battle map using custom maps and models, which is streamed into Discord via OBS.

### D&D UI

[D&D UI](https://github.com/jesskelsall/dnd-ui) is a customisable stream interface that I have written. It runs in a browser and is captured by OBS, displaying useful information depending on what is on screen:

- List of player characters and notable NPCs.
- "Hero" showcase of a specific character.
- Initiative tower with whose turn it currently is.

### Blackhole

[Blackhole](https://github.com/ExistentialAudio/BlackHole) is a virtual audio driver that exposes virtual audio devices that act as both inputs and outputs. These are used to access application audio output in OBS as an input source. Blackhole replaces [Virtual Audio Cable (VAC)](https://vac.muzychenko.net/en/) from V3.

While Blackhole can easily be installed via Homebrew, multiple drivers are needed for this setup. This requires [manual changes to the source code before building it yourself with XCode](https://github.com/ExistentialAudio/BlackHole/wiki/Running-Multiple-BlackHole-Drivers). 4 drivers are recommended to cover all needs and future tweaks to the setup.

- Each XCode build is output in `~/Library/Developer/Xcode/DerivedData/<project>/Build/Products/Debug`
- Rename then copy the `Blackhole.driver` directory.

Driver installation:
- Copy the drivers to `/Library/Audio/Plug-Ins/HAL/`.
- Restart the macOS audio drivers in one of the following ways:
  - `sudo launchctl kickstart -kp system/com.apple.audio.coreaudiod`
  - Restart the computer.

The Blackhole virtual audio drivers should now be visible in the list of sound output devices.

### SoundSource

[SoundSource](https://rogueamoeba.com/soundsource/) is an audio controller and effects app that provides control over audio output on a per application basis. This allows the stream setup to send Spotify audio to a Blackhole audio driver so that it can be captured in OBS.

The application needs activating with a product key, otherwise static noise begins to play after 20 minutes.
