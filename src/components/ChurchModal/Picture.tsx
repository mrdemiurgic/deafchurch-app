import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import testPixUrl from '../../utils/churchPix';

import { getSelectedMarker } from '../../store/markers/selectors';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const { id } = useSelector(getSelectedMarker);

  const [pixUrl, setPixUrl] = useState<string>();

  useEffect(() => {
    testPixUrl(id).then((url) => setPixUrl(url));
  }, [id]);

  return (
    <div className={styles.pixContainer}>
      {pixUrl ? (
        <img className={styles.pix} alt="Church" src={pixUrl} key={pixUrl} />
      ) : (
        <div className={styles.noImageAvail}>
          Sorry, no image available
          <div className={styles.shrug}>¯\_(ツ)_/¯</div>
        </div>
      )}
    </div>
  );
};
