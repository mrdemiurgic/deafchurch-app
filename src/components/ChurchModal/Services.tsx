import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { reduceServices } from '../../utils/services';

import { getSelectedMarker } from '../../store/markers/selectors';

import ServiceTime from './ServiceTime';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { services, id } = useSelector(getSelectedMarker);

  const reducedServices = useMemo(() => reduceServices(services), [services]);

  return (
    <>
      {reducedServices.map(
        (service): JSX.Element => {
          if (service.day) {
            return (
              <div key={`${id}-${service.day}`} className={styles.card}>
                <div className={styles.serviceDay}>{service.day}</div>
                {service.times.length === 0 && (
                  <div className={styles.ministryTypeText}>
                    There are services on this day. Contact the church to find
                    out the times!
                  </div>
                )}
                {service.times.map((time) => (
                  <ServiceTime
                    key={`${id}-${service.day}-${time}`}
                    day={service.day}
                    id={id}
                    time={time}
                  />
                ))}
              </div>
            );
          }
          return <></>;
        },
      )}
    </>
  );
};
