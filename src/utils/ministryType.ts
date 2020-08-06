import {
  faSignLanguage,
  faAmericanSignLanguageInterpreting,
  faChurch,
  faUsers,
  faQuestion,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { MinistryType } from '../types/church';

import ministryTypes from '../data/ministryTypes.json';

export const description = (type: MinistryType): string | undefined => {
  if (ministryTypes !== undefined) {
    const item = ministryTypes.find((i) => i.key === type);
    if (item !== undefined) {
      return item.description;
    }
  }
  return undefined;
};

export const icon = (type: MinistryType): IconDefinition => {
  switch (type) {
    case 'Accessibility':
      return faAmericanSignLanguageInterpreting;
    case 'Integrated':
      return faUsers;
    case 'Supported':
      return faSignLanguage;
    case 'Independent':
      return faChurch;
    default:
      return faQuestion;
  }
};
