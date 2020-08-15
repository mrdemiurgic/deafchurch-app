import React from 'react';
import { Helmet } from 'react-helmet';

import Map from '../Map';
import Navigator from '../Navigator';
import YourLocation from '../YourLocation/Container';
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
      <Map />
      <YourLocation />
      <SelectedBox />
      <Search />
      <ChurchModal />
      <Navigator />
      <Loading />
    </>
  );
};
