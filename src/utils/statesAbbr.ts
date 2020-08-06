import states from '../data/states.json';

export const shortToLong = (short: string): string => {
  const result = states.find((state) => state.abbr === short);

  if (result !== undefined) {
    return result.name;
  }
  return '';
};

export const longToShort = (long: string): string => {
  const result = states.find((state) => state.name === long);

  if (result !== undefined) {
    return result.abbr;
  }
  return '';
};
