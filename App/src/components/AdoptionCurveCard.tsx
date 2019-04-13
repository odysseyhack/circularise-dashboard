import {
  Card,
  List,
  ListItem,
  FormLabel,
} from '@material-ui/core';
import React, { PureComponent } from 'react';

import styles from '../styles/drawers.module.scss';

import { InputParamater } from './InputParamter';
import { SliderParameter } from './SliderParameter';

type Props = {
  trCurrent: number;
  trMaxAdoption: number;
  curviness: number;
  startOfFastGrowth: number;
  takeoverPeriod: number;
  onChange: (field: keyof Props, val: any) => void;
};

export class AdoptionCurveCard extends PureComponent<Props> {
  public render() {
    const { trCurrent, trMaxAdoption, curviness, startOfFastGrowth, takeoverPeriod, onChange } = this.props;

    return (
      <Card className={styles.card}>
        <List>
          <ListItem className={styles.label}>
            <FormLabel>Current Transactions/month</FormLabel>
          </ListItem>

          <InputParamater
            value={trCurrent}
            onChange={(val) => { onChange('trCurrent', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Max Transactions/month</FormLabel>
          </ListItem>

          <InputParamater
            value={trMaxAdoption}
            onChange={(val) => { onChange('trMaxAdoption', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Adoption curve</FormLabel>
          </ListItem>

          <SliderParameter
            min={1}
            max={3000}
            value={curviness}
            onChange={(val) => { onChange('curviness', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Start Month Of Fast Growth</FormLabel>
          </ListItem>

          <SliderParameter
            min={1}
            max={36}
            value={startOfFastGrowth}
            onChange={(val) => { onChange('startOfFastGrowth', val); }}
          />

          <ListItem className={styles.label}>
            <FormLabel>Takeover Period</FormLabel>
          </ListItem>

          <SliderParameter
            min={1}
            max={36}
            value={takeoverPeriod}
            onChange={(val) => { onChange('takeoverPeriod', val); }}
          />
        </List>
      </Card>
    );
  }
}
