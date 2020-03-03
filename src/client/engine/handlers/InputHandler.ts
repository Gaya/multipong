import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';
import { ControlInput } from '../../domain/ControlInput';

function createInputHandler(): GameTickHandler {
  const availableInputs = [ControlInput.UP, ControlInput.DOWN];
  let input: ControlInput[] = [];

  window.addEventListener('keydown', ({ code }: KeyboardEvent) => {
    if (availableInputs.indexOf(code as ControlInput) === -1) return;

    input = [code as ControlInput, ...input];
  });

  window.addEventListener('keyup', ({ code }: KeyboardEvent) => {
    input = input.filter((p) => p !== code);
  });

  return function inputHandler(time: number, state: GameState): GameState {
    return {
      ...state,
      input,
    };
  };
}

export default createInputHandler;
