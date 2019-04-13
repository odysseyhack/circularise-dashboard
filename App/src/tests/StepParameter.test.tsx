import React from 'react';
import ReactDOM from 'react-dom';

import { StepParameter } from '../components/StepParameter';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<StepParameter
    value={10}
    checked={true}
    onChange={(val) => { }}
    onSelect={() => { }}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
