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
      // key={`${id}-${day}-${time.time}}`}
      className={`${styles.timeBox} ${
        time.time.indexOf('AM') !== -1 ? styles.morningBg : styles.afternoonBg
      }`}
    >
      <div className={styles.timeBoxText}>{time.time}</div>
      <FontAwesomeIcon
        className={styles.timeBoxIcon}
        icon={serviceTypeIcon(time.type)}
      />
    </div>
  );
};
