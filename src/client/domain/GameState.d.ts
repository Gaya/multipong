import { Pedle } from './Pedle';

export interface GameState {
  started: boolean;
  time: number;
  player?: Pedle;
  enemies: Pedle[];
}
