import { GameState } from './GameState';

export interface RenderListener {
  update: (newState: GameState) => void;
}

export interface RenderSubject {
  currentState: GameState;
  listeners: { [name: string]: RenderListener };
  setState: (newState: GameState) => GameState;
  attach: (name: string, listener: RenderListener) => void;
  detach: (name: string) => void;
}
