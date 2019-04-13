import { TextField, ListItem, ListItemIcon, Radio } from '@material-ui/core';
import React, { PureComponent } from 'react';

type Props = {
  value: number;
  checked: boolean;
  onChange: (val: number) => void;
  onSelect: () => void;
};

export class InputParamater extends PureComponent<Props> {
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(Number(event.target.value));
  }

  public render() {
    const { value, checked, onSelect } = this.props;

    return (
      <ListItem>
        <ListItemIcon><Radio checked={checked} onChange={onSelect} /></ListItemIcon>

        <TextField type="number" variant="outlined" value={value} onChange={this.handleChange} />
      </ListItem>
    );
  }
}
