import axios from 'axios';
import { LongLat } from '../types/church';

// CENTER OF USA
// const defaultPosition = {
//   center: [-97.380979, 42.877772],
//   zoom: 3,
// };

const url = `https://api.ipdata.co?api-key=${process.env.REACT_APP_IPDATA_KEY}`;

// Attempt ipdata.co first. If it fails, fallback to using browser's location service.

const fromLocationService = async ():Promise<LongLat> => new Promise(
  (resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        resolve([longitude, latitude]);
      });
    } else {
      reject(new Error('navigator.geolocation not available'));
    }
  },
);

const fromIpData = async (): Promise<LongLat> => {
  try {
    const { status, data } = await axios.get(url);

    if (status === 200) {
      return [data.longitude, data.latitude];
    }
    throw new Error('unable to use ipdata.co');
  } catch (error) {
    const result = await fromLocationService();
    return result;
  }
};

export default fromIpData;
