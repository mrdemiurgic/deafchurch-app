import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

import { useDispatch, useSelector } from 'react-redux';
import { setLongLat } from '../../store/viewport';
import { RootState } from '../../store';
import { unselect } from '../../store/markers';

import Markers from '../Markers';
import HoverPopup from '../HoverPopup';
import HoverMarker from '../HoverMarker';

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  ? process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  : '';
const mapStyle = process.env.REACT_APP_MAPBOX_STYLE;
const Map = ReactMapboxGl({
  accessToken: token,
});

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const deselectMarker = () => {
    dispatch(unselect());
  };

  const { zoom, longLat } = useSelector((state: RootState) => state.viewport);

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style={mapStyle}
      containerStyle={{
        position: 'absolute',
        zIndex: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
      }}
      zoom={zoom}
      center={longLat}
      onClick={(map, event: any) => {
        if (!event.originalEvent.defaultPrevented) deselectMarker();
      }}
      onDragStart={(map, event: any) => {
        deselectMarker();
      }}
      onDragEnd={(map, event: any) => {
        const { lng, lat } = event.target.transform.center;
        dispatch(setLongLat([lng, lat]));
      }}
      renderChildrenInPortal
    >
      <Markers />
      <HoverPopup />
      <HoverMarker />
    </Map>
  );
};
