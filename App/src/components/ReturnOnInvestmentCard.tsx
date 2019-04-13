import {
  Card,
  List,
  ListItem,
  FormLabel,
  Typography,
  Divider,
  Tab,
  Tabs,
} from '@material-ui/core';
import cx from 'classnames';
import React, { PureComponent } from 'react';

import styles from '../styles/drawers.module.scss';

import { InputParamater } from './InputParamter';
import { SliderParameter } from './SliderParameter';
import { StepParameter } from './StepParameter';

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
  discounter: number;
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

  public render() {
    const {
      trFee,
      trCosts,
      maxMultiplier,
      discounter,
      maturityRate,
      investors,
      onChange,
      onInvestorChange,
    } = this.props;

    return (
      <Card className={cx(styles.card, 'alternative-sliders')}>
        <List>
          <ListItem><Typography>Return On Investment</Typography></ListItem>

          <ListItem className={styles.label}>
            <FormLabel>Transaction Costs</FormLabel>
          </ListItem>

          <SliderParameter
            value={trCosts}
            max={trFee - 0.001}
            step={0.001}
            onChange={(val) => { onChange('trCosts', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Transaction Fee</FormLabel>
          </ListItem>

          <SliderParameter
            value={trFee}
            min={trCosts}
            max={2}
            step={0.001}
            onChange={(val) => { onChange('trFee', val); }}
          />

          <Divider />

          <ListItem style={{ paddingBottom: 0, justifyContent: 'center' }}>
            <FormLabel>Weight based on</FormLabel>
          </ListItem>

          <ListItem className={styles.label} style={{ justifyContent: 'space-between' }}>
            <FormLabel>Investment</FormLabel>
            <FormLabel>Multiplier</FormLabel>
          </ListItem>

          <StepParameter
            step={0.1}
            value={discounter}
            onChange={(val) => { onChange('discounter', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Maturity Rate (month)</FormLabel>
          </ListItem>

          <InputParamater
            value={maturityRate}
            onChange={(val) => { onChange('maturityRate', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Max Multiplier</FormLabel>
          </ListItem>

          <InputParamater
            value={maxMultiplier}
            onChange={(val) => { onChange('maxMultiplier', val); }}
          />

          <Divider />

          <Tabs
            variant="fullWidth"
            value={this.state.selectedInvestor}
            onChange={(_, val) => { this.setState({ selectedInvestor: val }); }}
          >
            {investors.map((_, i) => (
              <Tab key={i} label={`Investor ${i + 1}`} />
            ))}
          </Tabs>

          {investors.map((investor, i) => (
            this.state.selectedInvestor === i && <div key={i}>
              <ListItem className={styles.label}>
                <FormLabel>Starting Month</FormLabel>
              </ListItem>

              <InputParamater
                value={investor.startingMonth}
                onChange={(val) => { onInvestorChange(i, 'startingMonth', val); }}
              />

              <ListItem className={styles.label}>
                <FormLabel>Investment</FormLabel>
              </ListItem>

              <SliderParameter
                min={10000}
                max={1000000}
                step={10000}
                value={investor.investment}
                onChange={(val) => { onInvestorChange(i, 'investment', val); }}
              />

              <ListItem className={styles.label}>
                <FormLabel>Multiplier</FormLabel>
              </ListItem>

              <SliderParameter
                value={investor.multiplier}
                min={1}
                max={maxMultiplier}
                onChange={(val) => { onInvestorChange(i, 'multiplier', val); }}
              />
            </div>
          ))}
        </List>
      </Card>
    );
  }
}
