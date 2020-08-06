import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import Map from '../Map';
import Navigator from '../Navigator';
import YourLocation from '../YourLocation/Container';
import FadeOverlay from '../FadeOverlay';
import ChurchModal from '../ChurchModal';
import Search from '../Search';
import SelectedBox from '../SelectedBox';
import Loading from '../Loading';
import useUrlHandler from '../../hooks/useUrlHandler';
import useInitializeApp from '../../hooks/useInitializeApp';

export default (): JSX.Element => {
  useUrlHandler();
  useInitializeApp();

  return (
    <>
      <Helmet>
        <title>Find a Deaf Church near you!</title>
      </Helmet>
      <Loading />
      <FadeOverlay>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/:id" component={ChurchModal} />
        </Switch>
      </FadeOverlay>
      <Map />
      <YourLocation />
      <Navigator />
      <SelectedBox />
    </>
  );
};
