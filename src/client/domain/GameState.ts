import { Paddle } from './Paddle';
import { ControlInput } from './ControlInput';
import { Ball } from './Ball';

export interface GameState {
  balls: Ball[];
  started: boolean;
  time: number;
  input: ControlInput[];
  player?: Paddle;
  enemies: Paddle[];
}
