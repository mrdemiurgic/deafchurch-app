import React from 'react';

import styles from './styles.module.css';
import Tabs from './Tabs';
import Range from './Range';
import YourLocation from '../YourLocation';

export default (): JSX.Element => (
  <div className={styles.filterBoxContainer}>
    <YourLocation />
    <Range />
    <Tabs />
  </div>
);
