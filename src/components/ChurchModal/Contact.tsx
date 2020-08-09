import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faVideo,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const { email, phoneNumber, videoPhoneNumber } = useSelector(
    getSelectedMarker,
  );

  const callPhone = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const callVideoPhone = () => {
    window.location.href = `tel:${videoPhoneNumber}`;
  };

  const sendEmail = () => {
    window.open(`mailto:${email}`);
  };

  return (
    <>
      {email && (
        <div className={styles.card}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href={`mailto:${email}`} className={styles.contentLink}>
            Send Email
          </a>
          <button type="button" onClick={sendEmail}>
            send email
          </button>
        </div>
      )}
      {phoneNumber && (
        <div className={styles.card}>
          <FontAwesomeIcon icon={faPhone} />
          <a href={`tel:${phoneNumber}`} className={styles.contentLink}>
            {phoneNumber}
          </a>
        </div>
      )}
      {videoPhoneNumber && (
        <div className={styles.card}>
          <FontAwesomeIcon icon={faVideo} />
          {videoPhoneNumber}
        </div>
      )}
    </>
  );
};
