import React from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

import { useSelector } from 'react-redux';
import { getHoveringMarker } from '../../store/markers/selectors';

import styles from '../HoverPopup/styles.module.css';

export default (): JSX.Element => {
  const { longLat, show, id } = useSelector(getHoveringMarker);

  return (
    <div className={styles.pulse}>
      <Layer
        key={id}
        type="circle"
        paint={{
          'circle-radius': 16,
          'circle-color': '#ECD444',
          'circle-opacity': show ? 1 : 0,
          'circle-stroke-width': 0,
          'circle-stroke-color': '#ECD444',
          'circle-stroke-opacity': 0.8,
        }}
      >
        <Feature coordinates={longLat} />
      </Layer>
    </div>
  );
};
