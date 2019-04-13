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
  min?: number;
  max?: number;
};

export class SliderParameter extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  private handleMinMax(field: 'min' | 'max') {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const min = this.state.min !== undefined ?
      this.state.min : this.props.min !== undefined ? this.props.min : 0;

    const max = this.state.max !== undefined ?
      this.state.max : this.props.max !== undefined ? this.props.max : 10;

    return (
      <ListItem>
        <TextField type="number" variant="outlined" value={min} onChange={this.handleMinMax('min')} />

        <Slider className={styles.slider} min={min} max={max} step={step} defaultValue={value} handle={this.renderHandle} onAfterChange={onChange} />

        <TextField type="number" variant="outlined" value={max} onChange={this.handleMinMax('max')} />
      </ListItem>
    );
  }
}
