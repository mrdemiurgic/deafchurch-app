export default (id: string): Promise<string | undefined> => {
  const url = `${process.env.REACT_APP_CHURCH_PIX_URI}/${id}.jpeg`;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      resolve(undefined);
    };

    img.src = url;
  });
};
