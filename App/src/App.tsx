import {
  Card,
  CardContent,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import 'rc-slider/assets/index.css';
import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

import { AdoptionCurveCard } from './components/AdoptionCurveCard';
import { ReturnOnInvestmentCard } from './components/ReturnOnInvestmentCard';
import styles from './styles/app.module.scss';

type Props = {};

type State = {
  trCurrent: number;
  trMaxAdoption: number;
  curviness: number;
  startOfFastGrowth: number;
  takeoverPeriod: number;
  trFee: number;
  trCosts: number;
  multiplier: number;
  maxMultiplier: number;
  multiplierDiscounter: number;
  investment: number;
  investmentDiscounter: number;
  maturityRate: number;
  returnReceived: number;
};

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      trCurrent: 10,
      trMaxAdoption: 10000000,
      curviness: 500,
      startOfFastGrowth: 10,
      takeoverPeriod: 24,
      trFee: 0.1,
      trCosts: 0.01,
      multiplier: 4,
      maxMultiplier: 10,
      multiplierDiscounter: 1,
      investment: 100000,
      investmentDiscounter: 1,
      maturityRate: 1000,
      returnReceived: 0,
    };
  }

  private handleChange = (field: keyof State, val: any) => {
    this.setState({ [field]: val } as any);
  }

  private calcAdoption(t: number) {
    const { trCurrent, trMaxAdoption, curviness, startOfFastGrowth, takeoverPeriod } = this.state;

    return trCurrent + (trMaxAdoption - trCurrent) / (1 + Math.pow(curviness, (startOfFastGrowth + takeoverPeriod / 2 - t) / takeoverPeriod));
  }

  private adoptionCurve() {
    const { trMaxAdoption } = this.state;
    const curve: number[] = [];

    let t = 0;
    let res = 0;
    while (res < 0.999 * trMaxAdoption) {
      res = this.calcAdoption(t);
      curve.push(res);
      t++;
    }

    return curve;
  }

  private returnOnInvestmentCurve() {
    const {
      trFee,
      trCosts,
      multiplier,
      maxMultiplier,
      multiplierDiscounter,
      investment,
      investmentDiscounter,
      maturityRate,
      returnReceived,
    } = this.state;

    let t = 0;
    let endGoal = investment * multiplier - returnReceived;
    const curve: number[] = [];

    while (endGoal > 0) {
      const ac = this.calcAdoption(t);
      const t1 = (maxMultiplier - multiplier) * multiplierDiscounter;
      const t2 = investment * investmentDiscounter;
      const t3 = t * maturityRate;
      const investmentWeight = t1 * t2 + t3;

      const res = (trFee - trCosts) * ac;

      endGoal -= res;
      curve.push(res);
      t++;
    }

    return curve;
  }

  public render() {
    const d1 = this.adoptionCurve();
    const d2 = this.returnOnInvestmentCurve();

    return (
      <div className={styles.app}>
        {/* Adoption Curve Drawer */}
        <AdoptionCurveCard onChange={this.handleChange as any} {...this.state} />

        <main className={styles.content}>
          <Card className={styles.card}>
            <CardContent>
              <Line
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: d1.map((_, i) => i),
                  datasets: [
                    {
                      label: 'Adoption Curve',
                      lineTension: 0.1,
                      borderColor: '#D5914E',
                      data: d1,
                    },
                  ],
                }}
              />

              <Line
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: d2.map((_, i) => i),
                  datasets: [
                    {
                      label: 'Return On Investment',
                      lineTension: 0.1,
                      borderColor: '#4E97D5',
                      data: d2,
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </main>

        {/* Return On Investment Drawer */}
        <ReturnOnInvestmentCard onChange={this.handleChange as any} {...this.state} />
      </div>
    );
  }
}

export default () => (
  <MuiThemeProvider theme={createMuiTheme({ palette: { primary: { main: 'rgba(0,0,0,0.2)' } } })}>
    <App />
  </MuiThemeProvider>
);
