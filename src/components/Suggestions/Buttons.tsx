import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch } from 'react-redux';

import {
  faDirections,
  faShareAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { LongLat } from '../../types/church';

import { showOverlay } from '../../store/userInterface';
import { select } from '../../store/markers';
import share, { hasShare } from '../../utils/share';

import directions from '../../utils/direction';

import buttons from '../../styles/buttons.module.css';
import colors from '../../styles/colors.module.css';

interface Props {
  id: string;
  name: string;
  longLat: LongLat;
}

export default (props: Props): JSX.Element => {
  const { id, name, longLat } = props;
  const dispatch = useDispatch();

  const drive = () => {
    const url = directions(`${longLat[1]},${longLat[0]}`);
    window.open(url);
  };

  const shareChurch = () => {
    share(id, name);
  };

  const moreInfo = () => {
    dispatch(select(id));
    dispatch(showOverlay());
  };

  const numButtons = 2 + (hasShare ? 1 : 0);
  const width = `${100 / numButtons}%`;
  const fontSize = hasShare ? '1.3em' : '0.95em';

  return (
    <div className={buttons.buttonsContainer}>
      <div
        className={`${buttons.buttonContainer} ${hasShare && buttons.third}`}
        style={{ width }}
      >
        <button
          type="button"
          className={`${buttons.button} ${colors.buttonNeutral}`}
          onClick={moreInfo}
          style={{ fontSize }}
        >
          <FontAwesomeIcon icon={faInfoCircle} className={buttons.icon} />
          {numButtons < 3 && (
            <div className={buttons.text}>
              {numButtons < 3 ? 'more info' : 'info'}
            </div>
          )}
        </button>
      </div>

      {hasShare && (
        <div
          className={`${buttons.buttonContainer} ${buttons.third}`}
          style={{ width }}
        >
          <button
            type="button"
            className={`${buttons.button} ${colors.buttonPrimary}`}
            onClick={shareChurch}
            style={{ fontSize }}
          >
            <FontAwesomeIcon icon={faShareAlt} className={buttons.icon} />
            {numButtons < 3 && <div className={buttons.text}>share</div>}
          </button>
        </div>
      )}
      <div
        className={`${buttons.buttonContainer} ${hasShare && buttons.third}`}
        style={{ width }}
      >
        <button
          type="button"
          className={`${buttons.button} ${colors.buttonAction}`}
          onClick={drive}
          style={{ fontSize }}
        >
          <FontAwesomeIcon icon={faDirections} className={buttons.icon} />
          {numButtons < 3 && (
            <div className={buttons.text}>
              {numButtons < 3 ? 'directions' : 'gps'}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
