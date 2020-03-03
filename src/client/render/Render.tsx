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

  if (!gameState || !gameState.started) return null;

  // gameState.player.position
  const baseScale = 4;
  const playerHeight = gameState.player.size * baseScale;
  const playerX = 5;
  const playerY = (
    gameState.player.position
    - ((gameState.player.position / 100) * gameState.player.size)
  ) * baseScale;

  return (
    <svg viewBox="0 0 400 400">
      <g id="background">
        <rect width="400" height="400" fill="black" />
      </g>
      <g id="sides">
        <path strokeDasharray="10,10" d="M0 0 l400 0" stroke="white" strokeWidth={2} />
        <path strokeDasharray="10,10" d="M0 400 l400 0" stroke="white" strokeWidth={2} />
      </g>
      <g id="player">
        <rect width="4" rx="3" height={playerHeight} fill="white" x={playerX} y={playerY} />
      </g>
    </svg>
  );
}

export default Render;
