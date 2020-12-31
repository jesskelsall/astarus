# Dungeons & Dragons: Astarus Campaign Setting

Astarus is a homebrew D&D campaign setting created by me, Jessica Kelsall.

Here you will find all of my notes on Astarus, its people and places, and events, past & present.

## Contents

- [Astarus](astarus/README.md): the world itself.
- [Campaigns](campaigns/README.md): D&D campaigns set in Astarus.

## Commands

Automatically applying markdown links:

```bash
alias ml="node ../../../Sandbox/markdownLinks.js
```
Cropping Hero Forge image exports:

```bash
function hfc() {
  convert $1 -crop 300x512+100+0 $1
}
```
