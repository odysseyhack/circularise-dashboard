import { ListItem, TextField } from '@material-ui/core';
import Slider from 'rc-slider';
import React, { PureComponent } from 'react';

import styles from '../styles/slider-parameter.module.scss';

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
};

type State = {
  min: number;
  max: number;
};

export class SliderParameter extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      min: props.min !== undefined ? props.min : 0,
      max: props.max !== undefined ? props.max : 10,
    };
  }

  private handleMinMax(field: 'min' | 'max') {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'min' && Number(event.target.value) >= this.state.max) {
        return;
      }

      if (field === 'max' && Number(event.target.value) <= this.state.min) {
        return;
      }

      this.setState({ [field]: Number(event.target.value) } as any);
    };
  }

  public render() {
    const { value, step, onChange } = this.props;
    const { min, max } = this.state;

    return (
      <ListItem>
        <TextField type="number" variant="outlined" value={min} onChange={this.handleMinMax('min')} />

        <Slider
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          onAfterChange={onChange}
        />

        <TextField type="number" variant="outlined" value={max} onChange={this.handleMinMax('max')} />
      </ListItem>
    );
  }
}
