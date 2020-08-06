import { v4 as uuid } from 'uuid';
import { shortToLong } from '../statesAbbr';

import { Church } from '../../types/church';
import { SearchDoc, SearchDocData } from '../../types/userInterface';

export const buildDocData = (church: Church): SearchDocData => {
  const { name, denomination, state, city, id, longLat, services } = church;
  const newChurch: SearchDocData = {
    name,
    denomination,
    state,
    services,
    city,
    id,
    longLat,
  };

  return newChurch;
};

export default (church: Church): SearchDoc => {
  const data = buildDocData(church);

  const newDoc: SearchDoc = {
    id: uuid(),
    name: `${church.name} ${church.city} ${church.state} ${shortToLong(
      church.state,
    )} ${church.denomination}`,
    data,
  };

  return newDoc;
};
