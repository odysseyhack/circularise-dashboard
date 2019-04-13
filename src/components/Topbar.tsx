import { Card, InputBase } from '@material-ui/core';
import NotificationIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import cx from 'classnames';
import React, { PureComponent } from 'react';

import profilePhoto from '../assets/profile-photo-a.jpg';
import styles from '../styles/topbar.module.scss';

export class Topbar extends PureComponent {
    public render() {
        return (
            <Card className={styles.topbar}>
                <div className={styles.search}>
                    <SearchIcon className={styles.icon} />
                    <InputBase
                        placeholder="Search"
                        className={styles.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </div>
                <div className={styles.options}>
                    <div className={styles.notification}>
                        <div className={styles.dot} />
                        <NotificationIcon className={cx([styles.icon, styles['notification-icon']])} />
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.profile}>
                        <a className={styles.name}>John Doe</a>
                        <img className={styles.photo} src={profilePhoto} />
                    </div>
                </div>
            </Card>
        );
    }
}
