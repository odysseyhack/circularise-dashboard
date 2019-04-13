import React from 'react';
import ReactDOM from 'react-dom';

import { InputParamater } from '../components/InputParamter';

it('renders without crashing', () => {
  let currentValue: number = 10;
  const div = document.createElement('div');

  ReactDOM.render(<InputParamater value={currentValue} onChange={(val) => { currentValue = val; }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
