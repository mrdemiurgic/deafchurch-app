import axios from 'axios';
import { LongLat } from '../types/church';

// CENTER OF USA
// const defaultPosition = {
//   center: [-97.380979, 42.877772],
//   zoom: 3,
// };

// Attempt ipdata.co first. If it fails, fallback to using browser's location service.

const fromLocationService = async (): Promise<LongLat> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        resolve([longitude, latitude]);
      });
    } else {
      reject(new Error('navigator.geolocation not available'));
    }
  });

const url = `https://api.ipdata.co?api-key=${process.env.REACT_APP_IPDATA_KEY}`;

const fromIpData = async (): Promise<LongLat> => {
  const { status, data } = await axios.get(url);
  if (status === 200) {
    return [data.longitude, data.latitude];
  }
  throw new Error('unable to use ipdata.co');
};

export default async (): Promise<LongLat> => {
  try {
    const location = await fromIpData();
    return location;
  } catch (error) {
    const location = await fromLocationService();
    return location;
  }
};
