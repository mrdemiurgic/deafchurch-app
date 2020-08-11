import React from 'react';
import { Helmet } from 'react-helmet';
import {
  faCalendarAlt,
  faComments,
  faBible,
} from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import FadeOverlay from '../FadeOverlay';

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

import fade from '../../styles/transitions/fade.module.css';
import styles from './styles.module.css';
import { RootState } from '../../store';

export default (): JSX.Element => {
  const { show, name } = useSelector(getSelectedMarker);

  const showOverlay = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );

  const showModal = show && showOverlay;

  return (
    <CSSTransition
      in={showModal}
      unmountOnExit
      mountOnEnter
      classNames={fade}
      timeout={300}
    >
      <FadeOverlay>
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
      </FadeOverlay>
    </CSSTransition>
  );
};
