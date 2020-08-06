import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSelectedMarker } from '../store/markers/selectors';

export default (): void => {
  const history = useHistory();
  const { id: paramsId } = useParams();

  const { show, id } = useSelector(getSelectedMarker);

  useEffect(() => {
    if (show && id !== paramsId) {
      history.push(`/${id}`);
    } else if (!show && id !== '') {
      history.push('/');
    }
  }, [show, id, paramsId, history]);
};
