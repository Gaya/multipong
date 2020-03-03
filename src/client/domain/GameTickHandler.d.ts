import { GameState } from './GameState';

export type GameTickHandler = (time: number, state: GameState) => GameState;
