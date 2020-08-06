export const hasShare = !!navigator.share;

const share = async (churchId: string, churchName: string): Promise<void> => {
  if (navigator.share !== undefined) {
    const url = `${window.location.hostname}/${churchId}`;
    const title = churchName;
    const text = `Check out this church: ${churchName}`;

    await navigator.share({ url, title, text });
  }
};

export default share;
