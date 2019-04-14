import { TextField, ListItem } from '@material-ui/core';
import React, { PureComponent } from 'react';

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export class InputParamater extends PureComponent<Props> {
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(Number(event.target.value));
  }

  public render() {
    const { value } = this.props;

    return (
      <ListItem>
        <TextField
          type="number"
          variant="outlined"
          value={value} onChange={this.handleChange}
        />
      </ListItem>
    );
  }
}
