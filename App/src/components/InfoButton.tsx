import React, { PureComponent } from 'react';
import { IconButton, Dialog, DialogTitle } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import styles from '../styles/info-button.module.scss';

type Props = {
  title: string;
  description: string;
};

type State = {
  open: boolean;
};

export class InfoButton extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  private renderDialog(open: boolean) {
    const { title, description, ...other } = this.props;

    return (
      <Dialog
        className={styles.dialog}
        open={open}
        onClose={() => this.setState({ open: false })}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          {title}
        </DialogTitle>
        <div className={styles.description}>
          {description}
        </div>
      </Dialog>
    );
  }

  public render() {
    const { open } = this.state;

    return (
      <div>
        <IconButton
          aria-label="Info"
          className={styles.button}
          onClick={() => this.setState({ open: true })}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
        {this.renderDialog(open)}
      </div >
    );
  }
}
