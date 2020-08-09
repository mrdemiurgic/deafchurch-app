import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch } from 'react-redux';

import {
  faDirections,
  faShareAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { LongLat } from '../../types/church';
import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

import { showOverlay } from '../../store/userInterface';
import { select, hover } from '../../store/markers';
import { setLongLat } from '../../store/viewport';
import share, { hasShare } from '../../utils/share';

import directions from '../../utils/direction';

interface Props {
  id: string;
  name: string;
  longLat: LongLat;
}

export default (props: Props): JSX.Element => {
  const { id, name, longLat } = props;
  const dispatch = useDispatch();

  const drive = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const url = directions(`${longLat[1]},${longLat[0]}`);
    window.open(url);
  };

  const shareChurch = () => {
    share(id, name);
  };

  const moreInfo = () => {
    dispatch(select(id));
    dispatch(hover(id));
    dispatch(showOverlay());
    dispatch(setLongLat(longLat));
  };

  const numButtons = 2 + (hasShare ? 1 : 0);
  const width = `${100 / numButtons}%`;
  const fontSize = hasShare ? '1.3em' : '1em';

  return (
    <div className={styles.buttonsContainer}>
      <div
        className={`${styles.buttonContainer} ${hasShare && styles.third}`}
        style={{ width }}
      >
        <button
          type="button"
          className={`${styles.button} ${colors.buttonNeutral}`}
          onClick={moreInfo}
          style={{ fontSize }}
        >
          <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
          {numButtons < 3 && (
            <div className={styles.text}>
              {numButtons < 3 ? 'more info' : 'info'}
            </div>
          )}
        </button>
      </div>

      {hasShare && (
        <div
          className={`${styles.buttonContainer} ${styles.third}`}
          style={{ width }}
        >
          <button
            type="button"
            className={`${styles.button} ${colors.buttonPrimary}`}
            onClick={shareChurch}
            style={{ fontSize }}
          >
            <FontAwesomeIcon icon={faShareAlt} className={styles.icon} />
            {numButtons < 3 && <div className={styles.text}>share</div>}
          </button>
        </div>
      )}
      <div
        className={`${styles.buttonContainer} ${hasShare && styles.third}`}
        style={{ width }}
      >
        <button
          type="button"
          className={`${styles.button} ${colors.buttonAction}`}
          onClick={drive}
          style={{ fontSize }}
        >
          <FontAwesomeIcon icon={faDirections} className={styles.icon} />
          {numButtons < 3 && (
            <div className={styles.text}>
              {numButtons < 3 ? 'directions' : 'gps'}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
