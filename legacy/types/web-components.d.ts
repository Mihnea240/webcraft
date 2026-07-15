// Web Components types
import type { Player, World, ResourceLoader, InputManager } from './engine';

export interface WebcraftContextElement extends HTMLElement {
  // Resource management
  resourceLoader?: ResourceLoader;
  
  // Methods
  loadResources(): Promise<void>;
  getResourceLoader(): ResourceLoader;
}

export interface WebcraftPlayerElement extends HTMLElement {
  // Properties
  player: Player;
  readonly canvas: HTMLCanvasElement;
  
  // Methods
  setCanvasSize(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}

export interface WebcraftWorldElement extends HTMLElement {
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
export interface WebcraftContextElementConstructor {
  new (): WebcraftContextElement;
  prototype: WebcraftContextElement;
}

export interface WebcraftPlayerElementConstructor {
  new (): WebcraftPlayerElement;
  prototype: WebcraftPlayerElement;
}

export interface WebcraftWorldElementConstructor {
  new (): WebcraftWorldElement;
  prototype: WebcraftWorldElement;
}

// Custom element declarations
declare global {
  interface HTMLElementTagNameMap {
    'webcraft-context': WebcraftContextElement;
    'webcraft-player': WebcraftPlayerElement;
    'webcraft-world': WebcraftWorldElement;
  }
  
  interface WindowEventMap {
    'world-loaded': WorldLoadedEvent;
    'player-connected': PlayerConnectedEvent;
    'resources-loaded': ResourcesLoadedEvent;
  }
  
  // Custom element registry
  interface CustomElementRegistry {
    define(name: 'webcraft-context', constructor: WebcraftContextElementConstructor, options?: ElementDefinitionOptions): void;
    define(name: 'webcraft-player', constructor: WebcraftPlayerElementConstructor, options?: ElementDefinitionOptions): void;
    define(name: 'webcraft-world', constructor: WebcraftWorldElementConstructor, options?: ElementDefinitionOptions): void;
  }
}

export {};
