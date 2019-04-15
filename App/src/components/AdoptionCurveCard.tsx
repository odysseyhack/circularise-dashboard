import {
  Card,
  List,
  ListItem,
  FormLabel,
  Typography,
  ListItemSecondaryAction,
} from '@material-ui/core';
import React, { PureComponent } from 'react';

import styles from '../styles/drawers.module.scss';

import { InputParamater } from './InputParamter';
import { SliderParameter } from './SliderParameter';
import { InfoButton } from './InfoButton';
import { InfoItem } from '../App';

type Props = {
  trCurrent: number;
  trMaxAdoption: number;
  curviness: number;
  startOfFastGrowth: number;
  takeoverPeriod: number;
  onChange: (field: keyof Props, val: any) => void;
};

export class AdoptionCurveCard extends PureComponent<Props> {

  private items: InfoItem[] = [
    {
      title: 'Current Transactions/month',
      description: 'This is the starting value. If you are modelling the launch of a protocol, this parameter will usually be set to 0.',
    },
    {
      title: 'Max Transactions/month',
      description: 'Sets the final transactions per month for the given protocol if 100% adoption would be reached., i.e. the long-term value the S-curve will tend to.',
    },

    {
      title: 'Curviness',
      description: 'Is a constant defining the slope of the curve. The higher the value, the steeper the gradient of the curve and vice versa.'
    },
    {
      title: 'Start Month Of Fast Growth',
      description: 'This is the number of the months when the transactions/month will begin to increase exponentially.'
    },
    {
      title: 'Takeover Period',
      description: 'Defines the number of months the transactions/month will rapidly increase before it will slowly converge to the max value.'
    },
  ];

  private renderList() {
    return (
      <List>
        <ListItem><Typography>Adoption Curve</Typography>
          {/* <InfoButton title={this.items[0].title} description={this.items[0].description} /> */}
        </ListItem>

        <ListItem className={styles.label}>
          <FormLabel>{this.items[0].title}</FormLabel>
          <InfoButton title={this.items[0].title} description={this.items[0].description} />
        </ListItem>
        <InputParamater
          value={this.props.trCurrent}
          onChange={(val) => { this.props.onChange('trCurrent', val); }}
        />

        <ListItem className={styles.label}>
          <FormLabel>{this.items[1].title}</FormLabel>
          <InfoButton title={this.items[1].title} description={this.items[1].description} />
        </ListItem>
        <InputParamater
          value={this.props.trMaxAdoption}
          onChange={(val) => { this.props.onChange('trMaxAdoption', val); }}
        />

        <ListItem className={styles.label}>
          <FormLabel>{this.items[2].title}</FormLabel>
          <InfoButton title={this.items[2].title} description={this.items[2].description} />
        </ListItem>
        <SliderParameter
          min={10}
          max={3000}
          value={this.props.curviness}
          onChange={(val) => { this.props.onChange('curviness', val); }}
        />

        <ListItem className={styles.label}>
          <FormLabel>{this.items[3].title}</FormLabel>
          <InfoButton title={this.items[3].title} description={this.items[3].description} />
        </ListItem>
        <SliderParameter
          min={1}
          max={36}
          value={this.props.startOfFastGrowth}
          onChange={(val) => { this.props.onChange('startOfFastGrowth', val); }}
        />

        <ListItem className={styles.label}>
          <FormLabel>{this.items[4].title}</FormLabel>
          <InfoButton title={this.items[4].title} description={this.items[4].description} />
        </ListItem>
        <SliderParameter
          min={1}
          max={60}
          value={this.props.takeoverPeriod}
          onChange={(val) => { this.props.onChange('takeoverPeriod', val); }}
        />
      </List>
    );
  }

  public render() {
    return (
      <Card className={styles.card}>
        {this.renderList()}
      </Card>
    );
  }
}
