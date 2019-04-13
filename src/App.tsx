import { Card, CardContent } from '@material-ui/core';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

import styles from './styles/app.module.scss';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

type State = {
  x1: number;
  x2: number;
  x3: number;
};

class App extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      x1: 0,
      x2: 3,
      x3: 5,
    };
  }

  private handleChange(field: keyof State) {
    return (val: number) => {
      this.setState({ [field]: val } as any);
    };
  }

  private renderGraph(data1: number[], data2: number[], data3: number[]) {
    return (
      <div className={styles.projectContent}>

        <Card className={styles.card}>
          <CardContent>
            <Slider className={styles.slider} value={this.state.x1} onChange={this.handleChange('x1')} />

            <Slider classNAme={styles.slider} value={this.state.x2} onChange={this.handleChange('x2')} />

            <Slider className={styles.slider} value={this.state.x3} onChange={this.handleChange('x3')} />
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Line
              height={500}
              options={{ maintainAspectRatio: false }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'],
                datasets: [
                  {
                    label: 'Worst',
                    fill: '+2',
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(255,0,0,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data1,
                  },
                  {
                    label: 'Normal',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data2,
                  },
                  {
                    label: 'Best',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgba(0,255,0,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data3,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  public render() {
    const d1 = [...Array(12)].map((_, i) => Math.pow(i, 2));
    const d2 = d1.map((v, i) => v + i * this.state.x2);
    const d3 = d2.map((v, i) => v + i * this.state.x3);

    return (
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.container}>
          <Topbar />

          <div className={styles.content}>

            <a className={styles.fundTitle}>
              ROI Projections
            </a>

            {this.renderGraph(d1, d2, d3)}

          </div>
        </div>

      </div>
    );
  }
}

export default App;
