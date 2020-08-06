import React from 'react';
import { Popup } from 'react-mapbox-gl';

import { useSelector } from 'react-redux';
import { getHoveringMarker } from '../../store/markers/selectors';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const { show, longLat, name, id } = useSelector(getHoveringMarker);

  return (
    <Popup
      key={id}
      coordinates={longLat}
      anchor="bottom"
      className={`${styles.container}`}
      style={{ opacity: show ? 1 : 0 }}
    >
      <div className={styles.text}>{name}</div>
    </Popup>
  );
};
