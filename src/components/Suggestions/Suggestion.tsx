import React from 'react';
import { LongLat, Service } from '../../types/church';
import distance from '../../utils/distance';

import styles from './styles.module.css';

import { servicesToday } from '../../utils/services';
import ServiceTime from '../ChurchModal/ServiceTime';
import Buttons from './Buttons';

interface Props {
  id: string;
  name: string;
  city: string;
  services: Service[];
  state: string;
  denomination: string;
  longLat: LongLat;
  center: LongLat;
}

export default (props: Props): JSX.Element => {
  const {
    id,
    name,
    city,
    state,
    denomination,
    longLat,
    center,
    services,
  } = props;

  const dist = Math.floor(distance(longLat, center));

  const today = servicesToday(services);

  return (
    <div className={styles.suggestion} key={id}>
      <div className={styles.name}>{name}</div>
      <div className={styles.secondaryLine}>
        <div className={styles.location}>{`${city}, ${state}`}</div>
        {dist > 0 ? ` - ${dist} mi` : ''}
        <div className={styles.denomination}>
          {denomination || 'Unknown Denomination'}
        </div>
      </div>
      {today.length > 0 && (
        <div className={styles.services}>
          <div className={styles.servicesText}>Today&apos;s Services</div>
          {today.map((time) => (
            <ServiceTime
              key={`${id}-${time.time}`}
              id={id}
              day="whatever"
              time={time}
            />
          ))}
        </div>
      )}

      <Buttons name={name} longLat={longLat} id={id} />
    </div>
  );
};
