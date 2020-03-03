import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

function createAutoMoveHandler(): GameTickHandler {
  return function autoMoveHandler(time: number, state: GameState): GameState {
    return {
      ...state,
      player: {
        ...state.player,
        position: (Math.cos(time / 500) * 50) + 50,
      },
    };
  };
}

export default createAutoMoveHandler;
