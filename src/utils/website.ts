export default (website : string): string => {
  const url = website.indexOf('http') >= 0
    ? website
    : `http://${website}`;

  return url;
};
