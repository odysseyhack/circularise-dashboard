import React, { StatelessComponent } from 'react';

import styles from '../styles/page.module.scss';

export const Page: StatelessComponent = ({ children }) => (
  <div className={styles.page}>
    {children}
  </div>
);
