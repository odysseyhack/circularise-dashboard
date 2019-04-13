import { ListItem, ListItemIcon, Radio } from '@material-ui/core';
import Slider from 'rc-slider';
import React, { PureComponent } from 'react';

type Props = {
  value: number;
  checked: boolean;
  onChange: (val: number) => void;
  onSelect: () => void;
};

export class StepParameter extends PureComponent<Props> {
  private marks = Object.assign({}, [...Array(11)].map((_, i) => <div key={i}>{i}</div>));

  public render() {
    const { value, checked, onChange, onSelect } = this.props;

    return (
      <ListItem>
        <ListItemIcon><Radio checked={checked} onChange={onSelect} /></ListItemIcon>

        <Slider
          max={10}
          value={value}
          onChange={onChange}
          marks={this.marks}
        />
      </ListItem>
    );
  }
}
