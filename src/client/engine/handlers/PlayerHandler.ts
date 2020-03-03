import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';
import { ControlInput } from '../../domain/ControlInput';

function createPlayerHandler(): GameTickHandler {
  const moveSpeed = 1;
  const min = 0;
  const max = 100;

  function calcNewPosition(
    current: number,
    speed: number,
    moveUp: boolean,
    timePassed: number,
  ): number {
    const direction = moveUp ? -1 : 1;
    const newPosition = current + ((timePassed / 15) * speed * direction);

    if (newPosition > max) return max;
    if (newPosition < min) return min;

    return newPosition;
  }

  return function playerHandler(state: GameState, time: number, prevTime: number): GameState {
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

    const isUpPressed = state.input.indexOf(ControlInput.UP) > -1;
    const isDownPressed = state.input.indexOf(ControlInput.DOWN) > -1;
    const isBothPressed = isDownPressed && isUpPressed;

    if (!isBothPressed && (isUpPressed || isDownPressed)) {
      return {
        ...state,
        player: {
          ...state.player,
          position: calcNewPosition(state.player.position, moveSpeed, isUpPressed, time - prevTime),
        },
      };
    }

    return state;
  };
}

export default createPlayerHandler;
