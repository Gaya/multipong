import { GameState } from './GameState';

export type GameTickHandler = (state: GameState, time: number, prevTime: number) => GameState;
