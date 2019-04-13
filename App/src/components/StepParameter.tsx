import { ListItem, ListItemIcon, Radio } from '@material-ui/core';
import Slider from 'rc-slider';
import React, { PureComponent } from 'react';

type Props = {
  value: number;
  step?: number;
  onChange: (val: number) => void;
};

export class StepParameter extends PureComponent<Props> {
  private marks = Object.assign({}, [...Array(11)].map((_, i) => <div key={i}>{i}</div>));

  public render() {
    const { value, step, onChange } = this.props;

    return (
      <ListItem>
        <Slider
          max={1}
          step={step}
          value={value}
          onChange={onChange}
          marks={{
            0.5: '0',
          }}
        />
      </ListItem>
    );
  }
}
