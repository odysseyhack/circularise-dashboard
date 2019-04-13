import React from 'react';
import ReactDOM from 'react-dom';

import { AdoptionCurveCard } from '../components/AdoptionCurveCard';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <AdoptionCurveCard
      trCurrent={10}
      trMaxAdoption={10}
      curviness={2}
      startOfFastGrowth={10}
      takeoverPeriod={4}
      onChange={(val) => { }}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
