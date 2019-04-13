import {
  Card,
  List,
  ListItem,
  FormLabel,
} from '@material-ui/core';
import cx from 'classnames';
import React, { PureComponent } from 'react';

import styles from '../styles/drawers.module.scss';

import { InputParamater } from './InputParamter';
import { SliderParameter } from './SliderParameter';

type Props = {
  trFee: number;
  trCosts: number;
  multiplier: number;
  maxMultiplier: number;
  multiplierDiscounter: number;
  investment: number;
  investmentDiscounter: number;
  maturityRate: number;
  returnReceived: number;
  onChange: (field: keyof Props, val: any) => void;
};

export class ReturnOnInvestmentCard extends PureComponent<Props> {
  public render() {
    const {
      trFee,
      trCosts,
      multiplier,
      maxMultiplier,
      multiplierDiscounter,
      investment,
      investmentDiscounter,
      maturityRate,
      returnReceived,
      onChange,
    } = this.props;

    return (
      <Card className={cx(styles.card, 'alternative-sliders')}>
        <List>
          <ListItem className={styles.label}>
            <FormLabel>Transaction Fee ({trFee})</FormLabel>
          </ListItem>

          <SliderParameter
            value={trFee}
            max={2}
            step={0.1}
            onChange={(val) => { onChange('trFee', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Transaction Costs ({trCosts})</FormLabel>
          </ListItem>

          <SliderParameter
            value={trCosts}
            max={trFee - 0.01}
            step={0.01}
            onChange={(val) => { onChange('trCosts', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Multiplier ({multiplier})</FormLabel>
          </ListItem>

          <SliderParameter
            value={multiplier}
            min={1}
            onChange={(val) => { onChange('multiplier', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Max Multiplier</FormLabel>
          </ListItem>

          <InputParamater
            value={maxMultiplier}
            onChange={(val) => { onChange('maxMultiplier', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Multiplier Discounter ({multiplierDiscounter})</FormLabel>
          </ListItem>

          <SliderParameter
            min={0.1}
            max={1}
            step={0.1}
            value={multiplierDiscounter}
            onChange={(val) => { onChange('multiplierDiscounter', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Investment ({investment})</FormLabel>
          </ListItem>

          <SliderParameter
            min={10000}
            max={1000000}
            step={10000}
            value={investment}
            onChange={(val) => { onChange('investment', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Investment Discounter ({investmentDiscounter})</FormLabel>
          </ListItem>

          <SliderParameter
            min={0.1}
            max={1}
            step={0.1}
            value={investmentDiscounter}
            onChange={(val) => { onChange('investmentDiscounter', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Maturity Rate</FormLabel>
          </ListItem>

          <InputParamater
            value={maturityRate}
            onChange={(val) => { onChange('maturityRate', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Realized Gain</FormLabel>
          </ListItem>

          <InputParamater
            value={returnReceived}
            onChange={(val) => { onChange('returnReceived', val); }}
          />
        </List>
      </Card>
    );
  }
}
