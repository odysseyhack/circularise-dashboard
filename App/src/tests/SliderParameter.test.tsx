import React from 'react';
import ReactDOM from 'react-dom';

import { SliderParameter } from '../components/SliderParameter';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <SliderParameter
      value={10}
      min={2}
      max={20}
      step={2}
      onChange={(val) => { }}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
