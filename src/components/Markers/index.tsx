import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layer, Feature } from 'react-mapbox-gl';
import { Church } from '../../types/church';
import { isMobile } from '../../utils/userAgent';
import { hover, unhover, select } from '../../store/markers';
import { setLongLat } from '../../store/viewport';
import { getFilteredMarkers } from '../../store/markers/selectors';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const markers = useSelector(getFilteredMarkers);
  const mobile = isMobile();

  const featureLayer = useMemo(() => {
    const selectMarker = (church: Church) => {
      const { id, longLat } = church;
      const newLongLat = longLat.slice(0);
      dispatch(hover(id));
      dispatch(select(id));
      dispatch(setLongLat(newLongLat));
    };

    const mouseEnterHandler = (church: Church) => {
      if (mobile) {
        selectMarker(church);
      } else {
        dispatch(hover(church.id));
      }
    };

    const mouseLeaveHandler = () => {
      dispatch(unhover());
    };

    return markers.map((church: Church) => (
      <Feature
        key={church.id}
        coordinates={church.longLat}
        onMouseEnter={(mapWithEvt: any) => {
          mapWithEvt.originalEvent.preventDefault();
          mouseEnterHandler(church);
        }}
        onMouseLeave={mouseLeaveHandler}
        onClick={(mapWithEvt: any) => {
          if (!mapWithEvt.originalEvent.defaultPrevented) {
            mapWithEvt.originalEvent.preventDefault();
            selectMarker(church);
          }
        }}
      />
    ));
  }, [markers, dispatch, mobile]);

  return (
    <Layer
      type="circle"
      paint={{
        'circle-radius': 14,
        'circle-color': '#ECD444',
        'circle-opacity': 0.2,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ECD444',
        'circle-stroke-opacity': 0.8,
      }}
    >
      {featureLayer}
    </Layer>
  );
};
