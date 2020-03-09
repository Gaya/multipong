import React, { useEffect, useState } from 'react';

import { Observable } from '../domain/Observable';
import { GameState } from '../domain/GameState';
import { ControlInput } from '../domain/ControlInput';
import { playfieldSVGCoordinates } from '../engine/modules/playfield';

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

  const playerHeight = gameState.player.size;
  const playerX = 1;
  const playerY = gameState.player.position
    - ((gameState.player.position / 100) * gameState.player.size);
  const isUpPressed = gameState.input.indexOf(ControlInput.UP) > -1;
  const isDownPressed = gameState.input.indexOf(ControlInput.DOWN) > -1;

  const polygonPoints = playfieldSVGCoordinates(gameState.enemies.length);

  return (
    <svg viewBox="0 0 100 100">
      <g id="background">
        <rect width="100" height="100" fill="black" />
      </g>
      <g id="sides">
        <polyline points={polygonPoints} fill="none" stroke="white" strokeWidth={0.3} />
      </g>
      <g id="player">
        <rect width="1" rx="1" height={playerHeight} fill="white" x={playerX} y={playerY} />
      </g>
      {gameState.balls.length > 0 && (
        <g id="balls">
          {gameState.balls.map((ball) => <circle key={ball.id} cx={ball.x} cy={ball.y} r="1" fill="white" />)}
        </g>
      )}
      <g id="debug">
        <path d="M94,6 L95,4 L96,6 Z" fill={isUpPressed ? 'red' : 'white'} />
        <path d="M94,7 L95,9 L96,7 Z" fill={isDownPressed ? 'red' : 'white'} />
      </g>
    </svg>
  );
}

export default Render;
