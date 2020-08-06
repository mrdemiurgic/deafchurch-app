import React from 'react';
import { Helmet } from 'react-helmet';
import {
  faCalendarAlt,
  faComments,
  faBible,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import Banner from './Banner';
import MinistryType from './MinistryType';
import SeeOnMap from './SeeOnMap';
import Services from './Services';
import Website from './Website';
import Share from './Share';
import Contact from './Contact';
import Directions from './Directions';
import Header from './Header';
import Picture from './Picture';

import styles from './styles.module.css';
import { RootState } from '../../store';

export default (): JSX.Element => {
  const { show, name } = useSelector(getSelectedMarker);

  const showOverlay = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );

  return show && showOverlay ? (
    <div className={styles.container}>
      <Helmet>
        <title>
          {name}
          (deafchurch.app)
        </title>
      </Helmet>
      <div className={styles.innerContainer}>
        <Picture />
        <Header />
        <Directions />
        <Share />
        <Website />
        <SeeOnMap />
        <Banner icon={faBible} text="Deaf Ministry Type" />
        <MinistryType />
        <Banner icon={faCalendarAlt} text="Services" />
        <Services />
        <Banner icon={faComments} text="Contact" />
        <Contact />
      </div>
    </div>
  ) : (
    <></>
  );
};
