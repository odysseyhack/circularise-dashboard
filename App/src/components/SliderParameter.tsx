import { ListItem, TextField, Tooltip } from '@material-ui/core';
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
      min: 0,
      max: 10,
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

  public renderHandle(props: any) {
    const { value, dragging, index, ...restProps } = props;
    return (
      <div>
        <Slider.Handle value={value} {...restProps} />

        <div className={styles.handle}>{value}</div>
      </div>
    );
  }

  public render() {
    const { value, step, onChange } = this.props;
    const min = this.props.min !== undefined ? this.props.min : this.state.min;
    const max = this.props.max !== undefined ? this.props.max : this.state.max;

    return (
      <ListItem>
        <TextField type="number" variant="outlined" value={min} onChange={this.handleMinMax('min')} />

        <Slider
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          handle={this.renderHandle}
          onAfterChange={onChange}
        />

        <TextField type="number" variant="outlined" value={max} onChange={this.handleMinMax('max')} />
      </ListItem>
    );
  }
}
