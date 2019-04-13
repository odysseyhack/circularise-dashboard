import { ListItem, ListItemIcon, Radio } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { PureComponent } from 'react';

import styles from '../styles/select-paramter.module.scss';

type Props = {
  values: string[];
  value: string;
  checked: boolean;
  onChange: (val: string) => void;
  onSelect: () => void;
};

export class SelectParameter extends PureComponent<Props> {
  public render() {
    const { values, value, checked, onChange, onSelect } = this.props;

    return (
      <ListItem>
        <ListItemIcon><Radio checked={checked} onChange={onSelect} /></ListItemIcon>

        <ToggleButtonGroup
          className={styles['button-group']}
          exclusive
          value={value}
          onChange={(_, v) => { onChange(v); }}
        >
          {
            values.map((v) => (
              <ToggleButton key={v} value={v}>
                {v}
              </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
      </ListItem>
    );
  }
}
