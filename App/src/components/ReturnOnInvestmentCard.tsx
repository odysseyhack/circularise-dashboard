import {
  Card,
  List,
  ListItem,
  FormLabel,
  Typography,
  Divider,
  Tab,
  Tabs,
  Button,
} from '@material-ui/core';
import cx from 'classnames';
import React, { PureComponent } from 'react';

import styles from '../styles/drawers.module.scss';

import { InputParamater } from './InputParamter';
import { SliderParameter } from './SliderParameter';

type Investor = {
  investment: number;
  multiplier: number;
  startingMonth: number;
  returnReceived: number;
};

type Props = {
  trFee: number;
  trCosts: number;
  maxMultiplier: number;
  multiplierDiscounter: number;
  investmentDiscounter: number;
  maturityRate: number;
  investors: Investor[]
  onChange: (field: keyof Props, val: any) => void;
  onInvestorChange: (investor: number, field: keyof Investor, val: any) => void;
};

type State = {
  selectedInvestor: number;
};

export class ReturnOnInvestmentCard extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedInvestor: 0,
    };
  }

  private renderLabel(label: string) {
    return (
      <ListItem className={styles.label}>
        <FormLabel>{label}</FormLabel>
      </ListItem>
    );
  }
  private renderTitle(text: string) {
    return (
      <ListItem className={styles.label}>
        <Typography>{text}</Typography>
      </ListItem>
    );
  }

  private handleSubmit = async () => {
    await fetch('http://localhost:9000/transaction', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        command: 'transaction',
      }),
    });

  }

  public render() {
    const {
      trFee,
      trCosts,
      maxMultiplier,
      multiplierDiscounter,
      investmentDiscounter,
      maturityRate,
      investors,
      onChange,
      onInvestorChange,
    } = this.props;

    return (
      <Card className={cx(styles.card, 'alternative-sliders')}>
        <List>
          {/* Transaction Parameters */}
          {this.renderTitle('Transaction Parameters')}

          {this.renderLabel('Transaction Costs')}
          <SliderParameter
            value={trCosts}
            max={trFee - 0.001}
            step={0.001}
            onChange={(val) => { onChange('trCosts', val); }}
          />

          {this.renderLabel('Transaction Fee')}
          <SliderParameter
            value={trFee}
            min={trCosts}
            max={2}
            step={0.001}
            onChange={(val) => { onChange('trFee', val); }}
          />

          <Divider />

          {/* Protocol Parameters */}
          {this.renderTitle('Protocol Parameters')}

          {this.renderLabel('Weight based on Investment')}
          <SliderParameter
            value={investmentDiscounter}
            min={0.001}
            max={10}
            step={0.001}
            onChange={(val) => { onChange('investmentDiscounter', val); }}
          />

          {this.renderLabel('Weight based on Multiplier')}
          <SliderParameter
            value={multiplierDiscounter}
            min={0.001}
            max={50000}
            step={0.001}
            onChange={(val) => { onChange('multiplierDiscounter', val); }}
          />

          {this.renderLabel('Maturity Rate per month')}
          <InputParamater
            value={maturityRate}
            onChange={(val) => { onChange('maturityRate', val); }}
          />

          {this.renderLabel('Max Multiplier')}
          <InputParamater
            value={maxMultiplier}
            onChange={(val) => { onChange('maxMultiplier', val); }}
          />

          <Divider />


          {/* Investors */}
          {this.renderTitle('Investors')}
          <Tabs
            variant="fullWidth"
            value={this.state.selectedInvestor}
            onChange={(_, val) => {
              this.setState({ selectedInvestor: val });
            }}
          >
            {investors.map((_, i) => (
              <Tab key={i} label={`Investor ${i + 1}`} />
            ))}
          </Tabs>

          {investors.map((investor, i) => (
            this.state.selectedInvestor === i && <div key={i}>

              {this.renderLabel('Starting Month')}
              <InputParamater
                value={investor.startingMonth}
                onChange={(val) => { onInvestorChange(i, 'startingMonth', val); }}
              />

              {this.renderLabel('Investment')}
              <SliderParameter
                min={10000}
                max={1000000}
                step={10000}
                value={investor.investment}
                onChange={(val) => { onInvestorChange(i, 'investment', val); }}
              />

              {this.renderLabel('Multiplier')}

              <SliderParameter
                value={investor.multiplier}
                min={1}
                max={maxMultiplier}
                onChange={(val) => { onInvestorChange(i, 'multiplier', val); }}
              />

              <Button
                variant="contained"
                color="secondary"
                className={styles.button}
                onClick={this.handleSubmit}
              >
                Submit Investment
              </Button>
            </div>
          ))}
        </List>
      </Card>
    );
  }
}
