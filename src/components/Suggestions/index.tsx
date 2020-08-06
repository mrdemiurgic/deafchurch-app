import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import Suggestion from './Suggestion';
import { getSuggestions } from '../../store/userInterface/selectors';
import { SearchDocData } from '../../types/userInterface';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const suggestions = useSelector(getSuggestions);
  const center = useSelector((state: RootState) => state.viewport.longLat);

  return (
    <div className={styles.container}>
      {suggestions.map((suggestion: SearchDocData) => (
        <Suggestion
          id={suggestion.id}
          denomination={suggestion.denomination}
          services={suggestion.services}
          city={suggestion.city}
          state={suggestion.state}
          name={suggestion.name}
          center={center}
          longLat={suggestion.longLat}
        />
      ))}
    </div>
  );
};
