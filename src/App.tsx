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
import { Sidebar } from './components/Sidebar';
import { SliderParameter } from './components/SliderParameter';
import { StepParameter } from './components/StepParameter';
import { Topbar } from './components/Topbar';
import styles from './styles/app.module.scss';

type Props = StyledComponentProps & WithTheme;

type State = {
  drawerOpen: boolean;
  selectedParameter: keyof State;
  x1: number;
  x2: string;
  x3: number;
  x4: number;
};

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      drawerOpen: true,
      selectedParameter: 'x1',
      x1: 0,
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

  public renderGraph() {
    const { classes, theme } = this.props;

    const d1 = [...Array(12)].map((_, i) => Math.pow(i, 2));
    const d2 = d1.map((v, i) => v + i * this.state.x1);
    const d3 = d2.map((v, i) => v + i * this.state.x3);

    return (
      <div className={styles['data-content']}>
        {/* <AppBar
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
        </AppBar> */}

        {/* <Drawer
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

          <Divider /> */}

        <Card className={styles.options}>

          <List>
            <SliderParameter
              checked={this.state.selectedParameter === 'x1'}
              value={this.state.x1}
              onChange={this.handleChange('x1')}
              onSelect={this.handleSelection('x1')}
            />

            <SelectParameter
              checked={this.state.selectedParameter === 'x2'}
              values={['year', 'month', 'week']}
              value={this.state.x2}
              onChange={this.handleChange('x2')}
              onSelect={this.handleSelection('x2')}
            />

            <InputParamater
              checked={this.state.selectedParameter === 'x3'}
              value={this.state.x3}
              onChange={this.handleChange('x3')}
              onSelect={this.handleSelection('x3')}
            />

            <StepParameter
              checked={this.state.selectedParameter === 'x4'}
              value={this.state.x4}
              onChange={this.handleChange('x4')}
              onSelect={this.handleSelection('x4')}
            />
          </List>
          {/* </Drawer> */}

        </Card>

        {/* <main className={cx(classes!.content, { [classes!.contentShift!]: this.state.drawerOpen })}> */}
        <Card className={cx([styles.card, styles.graph])}>
          <CardContent>
            <Line
              options={{ maintainAspectRatio: true }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'],
                datasets: [
                  {
                    label: 'Worst',
                    fill: '+2',
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(255,0,0,1)',
                    data: d1,
                  },
                  {
                    label: 'Normal',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgba(75,192,192,1)',
                    data: d2,
                  },
                  {
                    label: 'Best',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgba(0,255,0,1)',
                    data: d3,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
        {/* </main> */}
      </div>
    );
  }

  public render() {

    return (
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.container}>
          <Topbar />

          <div className={styles.content}>

            <a className={styles.fundTitle}>
              ROI Projections
            </a>

            {this.renderGraph()}

          </div>
        </div>

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
