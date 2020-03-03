import React, { useState, useEffect } from 'react';

import { RenderSubject } from '../domain/RenderObservable';
import { GameState } from '../domain/GameState';

interface RenderProps {
  subject: RenderSubject;
}

function Render({ subject }: RenderProps): React.ReactElement {
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    subject.attach('GameRender', {
      update(newState) {
        setGameState(newState);
      },
    });

    return (): void => {
      subject.detach('GameRender');
    };
  }, [subject]);

  if (!gameState) return null;

  return <div>Started: {gameState.started.toString()}</div>;
}

export default Render;
