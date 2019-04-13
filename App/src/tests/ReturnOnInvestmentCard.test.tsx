import React from 'react';
import ReactDOM from 'react-dom';

import { ReturnOnInvestmentCard } from '../components/ReturnOnInvestmentCard';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ReturnOnInvestmentCard
      trFee={10}
      trCosts={10}
      maxMultiplier={4}
      discounter={2}
      maturityRate={10}
      investors={[{ investment: 1, multiplier: 2, startingMonth: 1, returnReceived: 3 }]}
      onChange={(val) => { }}
      onInvestorChange={(investor, field, val) => { }}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
