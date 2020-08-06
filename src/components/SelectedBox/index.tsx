import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { getSelectedMarker } from '../../store/markers/selectors';
import { RootState } from '../../store';

import styles from './styles.module.css';
import fade from '../../styles/transitions/fade.module.css';

import Suggestion from '../Suggestions/Suggestion';

export default (): JSX.Element => {
  const showOverlay = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );
  const center = useSelector((state: RootState) => state.viewport.longLat);

  const [classes, setClasses] = useState<string>(styles.container);

  const {
    show,
    id,
    name,
    longLat,
    denomination,
    city,
    state,
    services,
  } = useSelector(getSelectedMarker);

  const shouldShow = show && !showOverlay;

  useEffect(() => {
    if (shouldShow) {
      setClasses(`${styles.container} ${styles.pulse}`);
    }
  }, [shouldShow, id]);

  return (
    <CSSTransition mountOnEnter in={shouldShow} classNames={fade} timeout={300}>
      <div
        className={classes}
        onAnimationEnd={() => {
          setClasses(styles.container);
        }}
      >
        <Suggestion
          id={id}
          name={name}
          center={center}
          services={services}
          longLat={longLat}
          city={city}
          state={state}
          denomination={denomination}
        />
      </div>
    </CSSTransition>
  );
};
