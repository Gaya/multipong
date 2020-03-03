import React, { useState, useEffect } from 'react';

import { Observable } from '../domain/Observable';
import { GameState } from '../domain/GameState';

interface RenderProps {
  subject: Observable<GameState>;
}

function Render({ subject }: RenderProps): React.ReactElement {
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    subject.attach('GameRender', {
      update: setGameState,
    });

    return (): void => {
      subject.detach('GameRender');
    };
  }, [subject]);

  if (!gameState) return null;

  return (
    <div>{gameState.time}</div>
  );
}

export default Render;
