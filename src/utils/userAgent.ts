export const isMobile = (): boolean => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  }
  return false;
};

export const isiOS = (): boolean => {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i)
  ) {
    return true;
  }
  return false;
};

export const isiOSSafari = (): boolean => {
  const result = navigator.userAgent.match(/iPhone|iPad|iPod.*Safari/i);
  if (result) {
    return true;
  }
  return false;
};
