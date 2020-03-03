import { Paddle } from './Paddle';
import { ControlInput } from './ControlInput';

export interface GameState {
  started: boolean;
  time: number;
  input: ControlInput[];
  player?: Paddle;
  enemies: Paddle[];
}
