import { SearchDoc } from '../../types/userInterface';
import buildDoc from './buildDoc';
import { Church } from '../../types/church';

export default (churches: Church[]): SearchDoc[] => (
  churches.map((church) => buildDoc(church))
);
