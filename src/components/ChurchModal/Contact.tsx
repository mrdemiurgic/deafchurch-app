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

import ContactButtons from './ContactButtons';

export default (): JSX.Element => {
  const { email, phoneNumber, videoPhoneNumber } = useSelector(
    getSelectedMarker,
  );

  return (
    <>
      {email && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon
              icon={faEnvelope}
              className={styles.cardHeaderIcon}
            />
            E-mail
          </div>
          <ContactButtons type="email" data={email} />
        </div>
      )}
      {phoneNumber && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faPhone} className={styles.cardHeaderIcon} />
            Phone
          </div>
          <ContactButtons type="phone" data={phoneNumber} />
        </div>
      )}
      {videoPhoneNumber && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faVideo} className={styles.cardHeaderIcon} />
            Video Phone
          </div>
          <ContactButtons type="videoPhone" data={videoPhoneNumber} />
        </div>
      )}
    </>
  );
};
