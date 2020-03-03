import { createElement } from 'react';
import { render } from 'react-dom';

import { Observable } from '../domain/Observable';

import Render from './Render';

import { info } from '../helpers/logger';
import { GameState } from '../domain/GameState';

function createRootInDocument(): HTMLDivElement {
  const { body } = document;

  // create and append
  const root = document.createElement('div');
  body.appendChild(root);

  // set styles
  body.style.margin = '0';
  root.style.height = '100vh';
  root.style.width = '100vw';

  return root;
}

export default function initializeRendering(renderSubject: Observable<GameState>): void {
  info('Initialize Rendering');

  const root = createRootInDocument();

  render(createElement(Render, { subject: renderSubject }), root);
}
