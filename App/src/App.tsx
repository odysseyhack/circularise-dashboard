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
import { number } from 'prop-types';

type Props = {};

interface InvestmentParams {
  maxMultiplier: number;
  multiplier: number;
  multiplierDiscounter: number;
  investment: number;
  investmentDiscounter: number;
  month: number;
  maturityRate: number;
};

type State = {
  trCurrent: number;
  trMaxAdoption: number;
  curviness: number;
  startOfFastGrowth: number;
  takeoverPeriod: number;
  trFee: number;
  trCosts: number;
  multiplierDiscounter: number;
  investmentDiscounter: number;
  maxMultiplier: number;
  maturityRate: number;
  investors: Array<{
    investment: number;
    multiplier: number;
    startingMonth: number;
    returnReceived: number;
  }>;
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
      trCosts: 0.1,
      trFee: 0.15,
      maxMultiplier: 10,
      maturityRate: 5000,
      multiplierDiscounter: 0.001,
      investmentDiscounter: 0.001,
      investors: [
        { investment: 500000, multiplier: 2, startingMonth: 0, returnReceived: 0, },
        { investment: 500000, multiplier: 8, startingMonth: 0, returnReceived: 0, },
        { investment: 250000, multiplier: 3, startingMonth: 16, returnReceived: 0, },
      ],
    };
  }

  private handleChange = (field: keyof State, val: any) => {
    this.setState({ [field]: val } as any);
  }

  private handleInvestorChange = (investor: number, field: keyof State, val: any) => {
    const investors = [...this.state.investors];
    Object.assign(investors[investor], { [field]: val });

    this.setState({
      ...this.state,
      investors,
    });
  }

  private calcAdoption(t: number) {
    const { trCurrent, trMaxAdoption, curviness, startOfFastGrowth, takeoverPeriod } = this.state;

    return trCurrent + (trMaxAdoption - trCurrent) /
      (1 + Math.pow(curviness, (startOfFastGrowth + takeoverPeriod / 2 - t) / takeoverPeriod));
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
    const { trFee, trCosts, investors, } = this.state;

    let endGoal = investors.reduce((prev, curr) => prev + curr.investment * curr.multiplier, 0);
    let t = 0;
    const curve: number[] = [];

    while (endGoal > 0) {
      const ac = this.calcAdoption(t);
      const res = (trFee - trCosts) * ac;

      endGoal -= res;
      curve.push(res);
      t++;
    }

    return curve;
  }

  private calculateInvestmentWeight(params: InvestmentParams): number {
    const t1 = (params.maxMultiplier - params.multiplier) * params.multiplierDiscounter;
    const t2 = (params.investment / 1000) * params.investmentDiscounter;
    const t3 = params.month * params.maturityRate;
    const investmentWeight = (t1 * t2) + t3;

    return investmentWeight;
  }

  private calculateInvestors(month: number, endGoals: number[], investorCurves: number[][], allWeights: number) {
    const { trFee, trCosts, multiplierDiscounter, investmentDiscounter, maxMultiplier, maturityRate, investors } = this.state;
    investors.forEach((investor, i) => {
      if (month < investor.startingMonth + 1 || endGoals[i] <= 0) {
        investorCurves[i].push(0);
        return;
      }

      const weightShare = this.calculateInvestmentWeight({ maxMultiplier, multiplier: investor.multiplier, multiplierDiscounter, investment: investor.investment, investmentDiscounter, month, maturityRate }) / allWeights;
      const res = (trFee - trCosts) * this.calcAdoption(month) * weightShare;

      endGoals[i] -= res;
      investorCurves[i].push(res);
    });
  }

  private investorsCurve(months: number) {
    const { multiplierDiscounter, investmentDiscounter, maxMultiplier, maturityRate, investors } = this.state;
    const endGoals = investors.map((investor) => investor.multiplier * investor.investment);
    const investorCurves: number[][] = investors.map(() => []);

    for (let month = 0; month < months; month++) {
      const allWeights = investors.filter((investor, i) => endGoals[i] > 0 && month >= investor.startingMonth + 1).reduce((prev, curr) => {
        return prev + this.calculateInvestmentWeight({ maxMultiplier, multiplier: curr.multiplier, multiplierDiscounter, investment: curr.investment, investmentDiscounter, month, maturityRate });
      }, 0);

      this.calculateInvestors(month, endGoals, investorCurves, allWeights);
    }

    return investorCurves;
  }

  private renderGraph() {
    const d1 = this.adoptionCurve();
    const d2 = this.returnOnInvestmentCurve();
    const d3 = this.investorsCurve(d2.length);

    return (
      <main className={styles.content}>
        <Card className={styles.card}>
          <CardContent>
            <Line
              options={{ maintainAspectRatio: true }}
              data={{
                labels: d1.map((_, i) => i),
                datasets: [
                  { label: 'Adoption Curve', lineTension: 0.1, borderColor: '#D5914E', data: d1, },
                ],
              }}
            />

            <Line
              options={{ maintainAspectRatio: true }}
              data={{
                labels: d2.map((_, i) => i),
                datasets: [
                  {
                    label: 'Return On Investment', lineTension: 0.1, borderColor: '#4E97D5', backgroundColor: 'rgba(0,0,0,0)', data: d2,
                  },
                  ...d3.map((d, index) => ({
                    label: `Investor ${index + 1}`,
                    lineTension: 0.1,
                    borderColor: `#9${index * 9}F`,
                    backgroundColor: 'rgba(0,0,0,0)',
                    data: d,
                  })),],
              }} />
          </CardContent>
        </Card>
      </main>
    );
  }

  public render() {
    return (
      <div className={styles.app}>
        {/* Adoption Curve Drawer */}
        <AdoptionCurveCard
          onChange={this.handleChange as any}
          {...this.state} />

        {this.renderGraph()}

        {/* Return On Investment Drawer */}
        <ReturnOnInvestmentCard
          onChange={this.handleChange as any}
          onInvestorChange={this.handleInvestorChange as any}
          {...this.state} />
      </div>
    );
  }
}

export default () => (
  <MuiThemeProvider theme={createMuiTheme({ palette: { primary: { main: 'rgba(0,0,0,0.2)' } } })}>
    <App />
  </MuiThemeProvider>
);
