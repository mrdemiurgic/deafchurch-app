import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.css';

import { ServiceTime, serviceTypeIcon } from '../../utils/services';

interface Props {
  id: string;
  day: string;
  time: ServiceTime;
}

export default (props: Props): JSX.Element => {
  const { id, day, time } = props;

  return (
    <div
      key={`${id}-${day}-${time}`}
      className={styles.timeBox}
      style={{
        background: time.time.indexOf('AM') !== -1 ? '#ffefc4' : '#c4e0ff',
      }}
    >
      <div className={styles.timeBoxText}>{time.time}</div>
      <FontAwesomeIcon
        className={styles.timeBoxIcon}
        icon={serviceTypeIcon(time.type)}
      />
    </div>
  );
};
