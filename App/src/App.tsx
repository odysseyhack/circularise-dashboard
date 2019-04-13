import {
  Card,
  CardContent,
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
      trMaxAdoption: 10000,
      curviness: 500,
      startOfFastGrowth: 10,
      takeoverPeriod: 24,
      trFee: 0.01,
      trCosts: 0.1,
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

  private returnOnInvestment(adoptionCurve: number[]) {
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

    return adoptionCurve.map((ac, t) => {
      const t1 = (maxMultiplier - multiplier) * multiplierDiscounter;
      const t2 = investment * investmentDiscounter;
      const t3 = t * maturityRate;
      const investmentWeight = t1 * t2 + t3;

      return investmentWeight * (investment * multiplier - returnReceived) / (trFee * trCosts * ac);
    });
  }

  public render() {
    const d1 = this.adoptionCurve();
    const d2 = this.returnOnInvestment(d1);

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
                      borderColor: 'rgba(255,0,0,1)',
                      data: d1,
                    },
                    {
                      label: 'Return On Investment',
                      lineTension: 0.1,
                      borderColor: 'rgba(75,192,192,1)',
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

export default App;
