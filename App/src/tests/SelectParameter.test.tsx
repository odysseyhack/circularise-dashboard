import React from 'react';
import ReactDOM from 'react-dom';

import { SelectParameter } from '../components/SelectParameter';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <SelectParameter
      values={['Parameter A', 'Paramater B']}
      value={'Parameter'}
      checked={true}
      onChange={(val) => { }}
      onSelect={() => { }} />,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
