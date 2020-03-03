import { render } from 'react-dom';

import { RenderSubject } from '../domain/RenderObservable';

import createRenderSubject from './Subject';
import Render from './Render';

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

export default function initializeRendering(): RenderSubject {
  const root = createRootInDocument();

  const renderSubject = createRenderSubject();

  render(Render({ subject: renderSubject }), root);

  return renderSubject;
}
