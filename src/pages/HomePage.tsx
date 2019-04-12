import React, { Component, PureComponent } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import profilePhoto from '../assets/profile-photo-a.jpg';
import styles from '../styles/home-page.module.scss';
import { RouteComponentProps } from 'react-router';
import { Card } from '@material-ui/core';

type Props = RouteComponentProps;

type State = {

};

export class HomePage extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {

        };
    }

    private renderProject(name: String, target: Number) {
        return (
            <Card className={styles['project']}>
                <img className={styles['photo']} src={profilePhoto} />
                <div className={styles['project-content']}>
                    <a className={styles['project-title']}>{name}</a>
                    <a className={styles['project-funding-goal']}>Funding Goal: {target}</a>
                </div>
            </Card>);
    }

    render() {
        return (
            <div className={styles['home']}>
                <Sidebar>
                </Sidebar>

                <div className={styles['home-container']}>
                    <div className={styles['search-bar']}></div>
                    <div className={styles['home-content']}>
                        <div className={styles['header']}>
                            All Projects
                        </div>
                        <div className={styles['items']}>
                            {this.renderProject('Project X', 5000000)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}