# WebCraft Project Overview

## Core Concept
WebCraft is a high-performance Minecraft block and entity renderer built for the web using WebGL/WebGPU (via Three.js r170+ TSL). 

## Primary Goal
To be embedded inside standard `<iframe>` elements on websites. It must load almost instantly, use minimal VRAM, and achieve 60+ FPS on low-end/mobile hardware.

## Features
* **Format Support**: Parses and renders standard Bedrock Edition JSON blocks (`.json`) and geometries (`.geo.json`).
* **Resource Packs**: Supports custom texture and resource packs dynamically loaded at runtime.
* **Unified Pipeline**: Implements Indexed Vertex Pulling (IVP) to render complex custom blocks and animated entities in a single WebGPU draw call.
