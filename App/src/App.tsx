import {
  StyledComponentProps,
  WithTheme,
  Card,
  CardContent,
  Drawer,
  List,
  withStyles,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  FormLabel,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import cx from 'classnames';
import 'rc-slider/assets/index.css';
import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

import { InputParamater } from './components/InputParamter';
import { SelectParameter } from './components/SelectParameter';
import { SliderParameter } from './components/SliderParameter';
import { StepParameter } from './components/StepParameter';
import styles from './styles/app.module.scss';

type Props = StyledComponentProps & WithTheme;

type State = {
  drawerOpen: boolean;
  selectedParameter: keyof State;
  trCurrent: number;
  trMaxAdoption: number;
  curviness: number;
  startOfFastGrowth: number;
  takeoverPeriod: number;
  x2: string;
  x3: number;
  x4: number;
};

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      drawerOpen: true,
      selectedParameter: 'trCurrent',
      trCurrent: 10,
      trMaxAdoption: 10000,
      curviness: 500,
      startOfFastGrowth: 10,
      takeoverPeriod: 24,
      x2: 'year',
      x3: 5,
      x4: 8,
    };
  }

  private handleChange(field: keyof State) {
    return (val: any) => {
      this.setState({ [field]: val } as any);
    };
  }

  private handleSelection(field: keyof State) {
    return () => {
      this.setState({ selectedParameter: field });
    };
  }

  private toggleDrawer(state: boolean) {
    return () => {
      this.setState({ drawerOpen: state });
    };
  }

  private adoptionCurve() {
    const { trCurrent, trMaxAdoption, curviness, startOfFastGrowth, takeoverPeriod } = this.state;
    const curve: number[] = [];

    let t = 0;
    let res = 0;
    while (res < 0.999 * trMaxAdoption) {
      res = trCurrent + (trMaxAdoption - trCurrent) / (1 + Math.pow(curviness, (startOfFastGrowth + takeoverPeriod / 2 - t) / takeoverPeriod));
      curve.push(res);
      t++;
    }

    return curve;
  }

  public render() {
    const { classes, theme } = this.props;

    const d1 = this.adoptionCurve();
    // const d1 = [...Array(12)].map((_, i) => Math.pow(i, 2));
    const d2 = d1.map((v, i) => v + i * this.state.trCurrent);
    const d3 = d2.map((v, i) => v + i * this.state.x3);

    return (
      <div className={styles.app}>
        <AppBar
          position="fixed"
          className={cx(classes!.appBar, {
            [classes!.appBarShift!]: this.state.drawerOpen,
          })}
        >
          <Toolbar disableGutters={!this.state.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer(true)}
              className={cx(styles['menu-button'], {
                [styles['is-hidden']]: this.state.drawerOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Circularise Odyssey Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes!.drawer}
          variant="persistent"
          open={this.state.drawerOpen}
          classes={{ paper: classes!.drawerPaper }}
          onClose={this.toggleDrawer(false)}
        >
          <div className={styles['drawer-header']}>
            <IconButton onClick={this.toggleDrawer(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />

          <List>
            <ListItem className={styles.label}>
              <FormLabel>Current Transactions/month</FormLabel>
            </ListItem>

            <InputParamater
              checked={this.state.selectedParameter === 'trCurrent'}
              value={this.state.trCurrent}
              onChange={this.handleChange('trCurrent')}
              onSelect={this.handleSelection('trCurrent')}
            />

            <Divider />

            <ListItem className={styles.label}>
              <FormLabel>Max Transactions/month</FormLabel>
            </ListItem>

            <InputParamater
              checked={this.state.selectedParameter === 'trMaxAdoption'}
              value={this.state.trMaxAdoption}
              onChange={this.handleChange('trMaxAdoption')}
              onSelect={this.handleSelection('trMaxAdoption')}
            />

            <Divider />

            <ListItem className={styles.label}>
              <FormLabel>Adoption curve</FormLabel>
            </ListItem>

            <SliderParameter
              checked={this.state.selectedParameter === 'curviness'}
              min={1}
              max={3000}
              value={this.state.curviness}
              onChange={this.handleChange('curviness')}
              onSelect={this.handleSelection('curviness')}
            />

            <Divider />

            <ListItem className={styles.label}>
              <FormLabel>Start Month Of Fast Growth</FormLabel>
            </ListItem>

            <SliderParameter
              checked={this.state.selectedParameter === 'startOfFastGrowth'}
              min={1}
              max={36}
              value={this.state.startOfFastGrowth}
              onChange={this.handleChange('startOfFastGrowth')}
              onSelect={this.handleSelection('startOfFastGrowth')}
            />

            <Divider />

            <ListItem className={styles.label}>
              <FormLabel>Takeover Period</FormLabel>
            </ListItem>

            <SliderParameter
              checked={this.state.selectedParameter === 'takeoverPeriod'}
              min={1}
              max={36}
              value={this.state.takeoverPeriod}
              onChange={this.handleChange('takeoverPeriod')}
              onSelect={this.handleSelection('takeoverPeriod')}
            />
          </List>
        </Drawer>

        <main className={cx(classes!.content, { [classes!.contentShift!]: this.state.drawerOpen })}>
          <Card className={styles.card}>
            <CardContent>
              <Line
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: d1.map((_, i) => i),
                  datasets: [
                    {
                      label: 'Adoption Curve',
                      fill: '+2',
                      lineTension: 0.1,
                      borderColor: 'rgba(255,0,0,1)',
                      data: d1,
                    },
                    // {
                    //   label: 'Normal',
                    //   fill: false,
                    //   lineTension: 0.1,
                    //   borderColor: 'rgba(75,192,192,1)',
                    //   data: d2,
                    // },
                    // {
                    //   label: 'Best',
                    //   fill: false,
                    //   lineTension: 0.1,
                    //   borderColor: 'rgba(0,255,0,1)',
                    //   data: d3,
                    // },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
}

const drawerWidth = 400;

export default withStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}), { withTheme: true })(App);
