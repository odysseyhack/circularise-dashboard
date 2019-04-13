import { ListItem, ListItemIcon, Radio, TextField } from '@material-ui/core';
import Slider from 'rc-slider';
import React, { PureComponent } from 'react';

import styles from '../styles/slider-parameter.module.scss';

type Props = {
  value: number;
  checked: boolean;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  onSelect: () => void;
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
    const { value, checked, onChange, onSelect } = this.props;
    const { min, max } = this.state;

    return (
      <ListItem>
        <ListItemIcon><Radio checked={checked} onChange={onSelect} /></ListItemIcon>

        <TextField type="number" variant="outlined" value={min} onChange={this.handleMinMax('min')} />

        <Slider className={styles.slider} min={min} max={max} defaultValue={value} onAfterChange={onChange} />

        <TextField type="number" variant="outlined" value={max} onChange={this.handleMinMax('max')} />
      </ListItem>
    );
  }
}
