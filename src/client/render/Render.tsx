import React from 'react';

import { RenderSubject } from '../domain/RenderObservable';

interface RenderProps {
  subject: RenderSubject;
}

function Render({ subject }: RenderProps): React.ReactElement {
  subject.attach('GameRender', {
    update(newState) {
      console.log(newState);
    },
  });

  return <div>Hoi</div>;
}

export default Render;
