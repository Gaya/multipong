import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';
import { ControlInput } from '../../domain/ControlInput';

function createInputHandler(): GameTickHandler {
  const availableInputs = [ControlInput.UP, ControlInput.DOWN];
  let input: ControlInput[] = [];

  window.addEventListener('keydown', ({ key }: KeyboardEvent) => {
    const keyCode = key as ControlInput;

    if (availableInputs.indexOf(keyCode) === -1) return;

    input = [keyCode, ...input];
  });

  window.addEventListener('keyup', ({ key }: KeyboardEvent) => {
    input = input.filter((p) => p !== key);
  });

  return function inputHandler(state: GameState): GameState {
    return {
      ...state,
      input,
    };
  };
}

export default createInputHandler;
