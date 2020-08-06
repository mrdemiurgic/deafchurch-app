import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faVideo,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import Row from './Row';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { email, phoneNumber, videoPhoneNumber } = useSelector(
    getSelectedMarker,
  );

  return (
    <div className={styles.card}>
      {email && (
        <Row icon={faEnvelope}>
          <a href={`mailto: ${email}`} className={styles.contentLink}>
            Send Email
          </a>
        </Row>
      )}

      {phoneNumber && <Row icon={faPhone}>{phoneNumber}</Row>}
      {videoPhoneNumber && <Row icon={faVideo}>{videoPhoneNumber}</Row>}
    </div>
  );
};
