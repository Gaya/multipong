import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

function createTimeHandler(): GameTickHandler {
  return function timeHandler(state: GameState, time: number): GameState {
    return { ...state, time };
  };
}

export default createTimeHandler;
