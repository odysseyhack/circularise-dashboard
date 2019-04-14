import {
  Card,
  List,
  ListItem,
  FormLabel,
  Typography,
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

  private renderList() {
    return (
      <List>
        <ListItem><Typography>Adoption Curve</Typography></ListItem>
        <ListItem className={styles.label}><FormLabel>Current Transactions/month</FormLabel></ListItem>
        <InputParamater value={this.props.trCurrent} onChange={(val) => { this.props.onChange('trCurrent', val); }} />
        <ListItem className={styles.label}><FormLabel>Max Transactions/month</FormLabel></ListItem>
        <InputParamater value={this.props.trMaxAdoption} onChange={(val) => { this.props.onChange('trMaxAdoption', val); }} />
        <ListItem className={styles.label}><FormLabel>Curviness</FormLabel></ListItem>
        <SliderParameter min={10} max={3000} value={this.props.curviness} onChange={(val) => { this.props.onChange('curviness', val); }} />
        <ListItem className={styles.label}><FormLabel>Start Month Of Fast Growth</FormLabel></ListItem>
        <SliderParameter min={1} max={36} value={this.props.startOfFastGrowth} onChange={(val) => { this.props.onChange('startOfFastGrowth', val); }} />
        <ListItem className={styles.label}><FormLabel>Takeover Period</FormLabel></ListItem>
        <SliderParameter min={1} max={60} value={this.props.takeoverPeriod} onChange={(val) => { this.props.onChange('takeoverPeriod', val); }} />
      </List>);
  }

  public render() {
    return (
      <Card className={styles.card}>
        {this.renderList()}
      </Card>
    );
  }
}
