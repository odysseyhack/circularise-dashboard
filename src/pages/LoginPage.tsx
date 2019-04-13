import { CardContent, TextField, Card, Tabs, Tab, Button, Select, OutlinedInput, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import styles from '../styles/login-page.module.scss';

type Props = RouteComponentProps;

export enum Roles {
  BUIDLER = 'buidler',
  INVESTOR = 'investor',
  GOVERNOR = 'governor',
}

type State = {
  tabValue: TabValue;
  role: Roles;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
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
      role: Roles.BUIDLER,
    };
  }

  private handleTabChange = (_: React.ChangeEvent<{}>, value: TabValue) => {
    this.setState({
      tabValue: value,
    });
  }

  private handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ role: event.target.value as Roles });
  }

  private handleFieldChange(field: keyof State) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ [field]: event.target.value } as any);
    };
  }

  private handleSubmit = async () => {
    const { username, firstname, lastname, role, password } = this.state;

    try {
      if (this.state.tabValue === TabValue.REGISTER) {
        await fetch('http://35.180.111.132:9000/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username,
            firstname,
            lastname,
            role,
            password,
          }),
        });
      }

      await fetch('http://35.180.111.132:9000/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      this.props.history.push('/home');
    } catch (e) {
      // console.log(`Failed registering: ${e}`);
    }
  }

  private renderLoginInput() {
    return (
      <div>
        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('username')}
        />

        {/* Password */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('password')}
        />
      </div>
    );
  }

  private renderRegisterInput() {
    return (
      <div>
        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('username')}
        />

        {/* Role */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="role">Role</InputLabel>

          <Select
            value={this.state.role}
            onChange={this.handleRoleChange}
            input={
              <OutlinedInput
                labelWidth={35}
                name="role"
                id="role"
              />
            }
          >
            <MenuItem value={Roles.BUIDLER}>Buidler</MenuItem>
            <MenuItem value={Roles.INVESTOR}>Investor</MenuItem>
            <MenuItem value={Roles.GOVERNOR}>Governor</MenuItem>
          </Select>
        </FormControl>

        {/* Password */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('password')}
        />

        {/* Firstname */}
        <TextField
          fullWidth
          label="Firstname"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('firstname')}
        />

        {/* Lastname */}
        <TextField
          fullWidth
          label="Lastname"
          variant="outlined"
          margin="normal"
          onChange={this.handleFieldChange('lastname')}
        />
      </div>
    );
  }

  public render() {
    return (
      <div className={styles['login-page']}>
        <Card className={styles.card}>
          <Tabs className={styles.tabs} variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange}>
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
