import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { setSearchRange } from '../../store/userInterface';

import styles from './range.module.css';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const range = useSelector(
    (state: RootState) => state.userInterface.searchRange,
  );

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = parseInt(e.currentTarget.value, 10);
    dispatch(setSearchRange(newRange));
  };

  return (
    <div className={styles.container}>
      Within
      <select value={range} onChange={changeHandler} className={styles.select}>
        <option value="25">25 mi</option>
        <option value="50">50 mi</option>
        <option value="75">75 m</option>
        <option value="100">100 mi</option>
        <option value="150">150 mi</option>
      </select>
    </div>
  );
};
