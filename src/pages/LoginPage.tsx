import { CardContent, TextField, Card, Tabs, Tab, Button } from '@material-ui/core';
import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import styles from '../styles/login-page.module.scss';

type Props = RouteComponentProps;

type State = {
  tabValue: TabValue;
};

enum TabValue {
  REGISTER,
  LOGIN,
}

export class LoginPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tabValue: TabValue.LOGIN,
    };
  }

  private handleChange = (_: React.ChangeEvent<{}>, value: TabValue) => {
    this.setState({
      tabValue: value,
    });
  }

  private handleSubmit = async () => {
    if (this.state.tabValue === TabValue.REGISTER) {
      try {
        await fetch('http://35.180.111.132:9000/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ userName: 'test@test.nl' }),
        });
      } catch (e) {
        console.log(`Failed registering: ${e}`);
      }

      return;
    }

    this.props.history.push('/home');
  }

  private renderLoginInput() {
    return (
      <div>
        <TextField fullWidth label="Username" variant="outlined" margin="normal" />
      </div>
    );
  }

  private renderRegisterInput() {
    return (
      <div>
        <TextField fullWidth label="Username" variant="outlined" margin="normal" />

        <TextField fullWidth label="Firstname" variant="outlined" margin="normal" />

        <TextField fullWidth label="Lastname" variant="outlined" margin="normal" />
      </div>
    );
  }

  public render() {
    return (
      <div className={styles['login-page']}>
        <Card className={styles.card}>
          <Tabs className={styles.tabs} variant="fullWidth" value={this.state.tabValue} onChange={this.handleChange}>
            <Tab label="Login" value={TabValue.LOGIN} />
            <Tab label="Register" value={TabValue.REGISTER} />
          </Tabs>

          <CardContent className={styles['card-content']}>
            {this.state.tabValue === TabValue.LOGIN && this.renderLoginInput()}

            {this.state.tabValue === TabValue.REGISTER && this.renderRegisterInput()}

            <Button className={styles['submit-button']} variant="contained" color="primary" onClick={this.handleSubmit}>
              {this.getSubmitText()}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  private getSubmitText() {
    switch (this.state.tabValue) {
      case TabValue.LOGIN:
        return 'Login';
      case TabValue.REGISTER:
        return 'Register';
    }
  }
}
