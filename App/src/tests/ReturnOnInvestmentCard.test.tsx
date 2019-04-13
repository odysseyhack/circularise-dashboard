import React from 'react';
import ReactDOM from 'react-dom';

import { ReturnOnInvestmentCard } from '../components/ReturnOnInvestmentCard';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ReturnOnInvestmentCard
      trFee={10}
      trCosts={10}
      multiplier={2}
      multiplierDiscounter={10}
      maxMultiplier={4}
      investment={10}
      investmentDiscounter={10}
      maturityRate={10}
      returnReceived={10}
      onChange={(val) => { }}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
