import HomeIcon from '@material-ui/icons/HomeOutlined';
import React, { Component } from 'react';

import styles from '../styles/sidebar.module.scss';

export default class Sidebar extends Component {
    public render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles['sidebar-title']}>DigitalCommons.IO</div>
                <div className={styles['sidebar-items']}>
                    <div className={styles['sidebar-item']}>
                        <div className={styles['sidebar-item-selection']} />
                        <HomeIcon className={styles.icon} />
                        <div className={styles['sidebar-item-name']}>Home</div>
                    </div>
                </div>
            </div>
        );
    }
}
