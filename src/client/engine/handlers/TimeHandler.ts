import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

function createTimeHandler(): GameTickHandler {
  return function timeHandler(time: number, state: GameState): GameState {
    return { ...state, time };
  };
}

export default createTimeHandler;
