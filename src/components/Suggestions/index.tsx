import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { RootState } from '../../store';
import Suggestion from './Suggestion';
import { getSuggestions } from '../../store/userInterface/selectors';
import { SearchDocData } from '../../types/userInterface';

import fade from '../../styles/transitions/fade.module.css';
import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

import { LongLat } from '../../types/church';

import SeeRest from './SeeRest';

const renderSuggestion = (
  suggestion: SearchDocData,
  center: LongLat,
): JSX.Element => (
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
);

export default (): JSX.Element => {
  const [showFull, setShowFull] = useState<boolean>(false);
  const fullSuggestions = useSelector(getSuggestions);
  const center = useSelector((state: RootState) => state.viewport.longLat);

  const suggestions = showFull ? fullSuggestions : fullSuggestions.slice(0, 5);

  useEffect(() => {
    setShowFull(false);
  }, [fullSuggestions]);

  return (
    <div className={styles.container}>
      <TransitionGroup>
        {suggestions.map((suggestion) => (
          <CSSTransition
            key={suggestion.id}
            mountOnEnter
            unmountOnExit
            classNames={fade}
            timeout={300}
          >
            {renderSuggestion(suggestion, center)}
          </CSSTransition>
        ))}
        {!showFull && fullSuggestions.length > 5 && (
          <CSSTransition
            key="seeRest"
            mountOnEnter
            unmountOnExit
            classNames={fade}
            timeout={300}
          >
            <SeeRest
              onClick={() => setShowFull(true)}
              numSuggestions={fullSuggestions.length}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
