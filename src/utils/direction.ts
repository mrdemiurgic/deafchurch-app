import { isiOS } from './userAgent';

const googleMaps = 'https://www.google.com/maps/dir/?api=1&destination=';
const appleMaps = 'http://maps.apple.com/?daddr=';

export default (address: string): string => {
  const iOS = isiOS();

  const uri = encodeURI(`${iOS ? appleMaps : googleMaps}${address}`);
  return uri;
};
