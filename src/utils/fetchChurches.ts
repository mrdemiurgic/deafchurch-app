import axios from 'axios';

import { Church } from '../types/church';

const url = `${process.env.REACT_APP_METADATA_URI}/churches.json`;

export default async (): Promise<Church[]> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return [];
  }
};
