import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getSelectedMarker } from '../store/markers/selectors';

export default (): void => {
  const history = useHistory();
  const location = useLocation();

  const paramsId = location.pathname.slice(1);

  const { show, id } = useSelector(getSelectedMarker);

  useEffect(() => {
    if (show && id !== paramsId) {
      history.replace(`/${id}`);
    } else if (!show && id !== '') {
      history.replace('/');
    }
  }, [show, id, paramsId, history]);
};
