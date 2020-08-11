import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

import { RootState } from '../../store';

import { setSearchText } from '../../store/userInterface';
import {
  getSearchText,
  getSuggestions,
} from '../../store/userInterface/selectors';

import FadeOverlay from '../FadeOverlay';

import SearchIcon from './SearchIcon';
import Suggestions from '../Suggestions';
import FilterBox from './FilterBox';
import Title from './Title';

import fade from '../../styles/transitions/fade.module.css';
import styles from './styles.module.css';
import { getSelectedMarker } from '../../store/markers/selectors';

export default (): JSX.Element => {
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const searchText = useSelector(getSearchText);

  const { show: showSelectedChurch } = useSelector(getSelectedMarker);
  const { showOverlay, suggestionsMode } = useSelector(
    (state: RootState) => state.userInterface,
  );

  const show = !showSelectedChurch && showOverlay;

  const suggestions = useSelector(getSuggestions);
  const showSuggestions = suggestions.length > 0;

  const hideFilterBox = suggestionsMode === 'searchText' && showSuggestions;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (searchInput.current !== null) {
      searchInput.current.blur();
    }
    // start the action that picks the top suggestion
  };

  const onFocus = () => {
    // dispatch(hideFilterBox());
    // dispatch(setSearchText(''));
    // dispatch(unhover());
    // dispatch(unselect());
  };

  return (
    <CSSTransition
      in={show}
      classNames={fade}
      mountOnEnter
      // unmountOnExit
      timeout={300}
    >
      <FadeOverlay>
        <div className={styles.container}>
          <Title />
          <form className={styles.searchBarForm} onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.searchBarInput}
                placeholder="search by name, state, city..."
                ref={searchInput}
                onChange={onChange}
                onFocus={onFocus}
                value={searchText}
              />
              <SearchIcon />
            </div>
          </form>
          <CSSTransition
            in={!hideFilterBox}
            mountOnEnter
            unmountOnExit
            classNames={fade}
            timeout={300}
          >
            <FilterBox />
          </CSSTransition>
          <Suggestions />
        </div>
      </FadeOverlay>
    </CSSTransition>
  );
};
