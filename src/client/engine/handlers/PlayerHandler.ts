import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';

function createPlayerHandler(): GameTickHandler {
  return function playerHandler(time: number, state: GameState): GameState {
    if (!state.started || !state.player) {
      info('Create player');

      return {
        ...state,
        started: true,
        player: {
          position: 50,
          size: 10,
          deg: 180,
        },
      };
    }

    return state;
  };
}

export default createPlayerHandler;
