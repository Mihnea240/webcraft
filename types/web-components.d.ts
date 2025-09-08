// Web Components types
import type { Player, World, ResourceLoader, InputManager } from './engine';

export interface MinecraftContextElement extends HTMLElement {
  // Resource management
  resourceLoader?: ResourceLoader;
  
  // Methods
  loadResources(): Promise<void>;
  getResourceLoader(): ResourceLoader;
}

export interface MinecraftPlayerElement extends HTMLElement {
  // Properties
  player: Player;
  readonly canvas: HTMLCanvasElement;
  
  // Methods
  setCanvasSize(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}

export interface MinecraftWorldElement extends HTMLElement {
  // Properties
  world?: World;
  player?: Player;
  
  // Methods
  setCanvasSize(width: number, height: number): void;
  loadWorld(): Promise<void>;
  connectPlayer(player: Player): void;
  disconnectPlayer(): void;
}

// Event interfaces for custom events
export interface WorldLoadedEvent extends CustomEvent {
  detail: {
    world: World;
    timestamp: number;
  };
}

export interface PlayerConnectedEvent extends CustomEvent {
  detail: {
    player: Player;
    timestamp: number;
  };
}

export interface ResourcesLoadedEvent extends CustomEvent {
  detail: {
    resourceLoader: ResourceLoader;
    timestamp: number;
  };
}

// Custom element constructor interfaces
export interface MinecraftContextElementConstructor {
  new (): MinecraftContextElement;
  prototype: MinecraftContextElement;
}

export interface MinecraftPlayerElementConstructor {
  new (): MinecraftPlayerElement;
  prototype: MinecraftPlayerElement;
}

export interface MinecraftWorldElementConstructor {
  new (): MinecraftWorldElement;
  prototype: MinecraftWorldElement;
}

// Custom element declarations
declare global {
  interface HTMLElementTagNameMap {
    'minecraft-context': MinecraftContextElement;
    'minecraft-player': MinecraftPlayerElement;
    'minecraft-world': MinecraftWorldElement;
  }
  
  interface WindowEventMap {
    'world-loaded': WorldLoadedEvent;
    'player-connected': PlayerConnectedEvent;
    'resources-loaded': ResourcesLoadedEvent;
  }
  
  // Custom element registry
  interface CustomElementRegistry {
    define(name: 'minecraft-context', constructor: MinecraftContextElementConstructor, options?: ElementDefinitionOptions): void;
    define(name: 'minecraft-player', constructor: MinecraftPlayerElementConstructor, options?: ElementDefinitionOptions): void;
    define(name: 'minecraft-world', constructor: MinecraftWorldElementConstructor, options?: ElementDefinitionOptions): void;
  }
}

export {};
