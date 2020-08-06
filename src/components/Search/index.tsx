import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';

import { setSearchText } from '../../store/userInterface';
import {
  getSearchText,
  getSuggestions,
} from '../../store/userInterface/selectors';

import Suggestions from '../Suggestions';
import FilterBox from './FilterBox';
import Title from './Title';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const searchText = useSelector(getSearchText);

  const { showOverlay: show, suggestionsMode } = useSelector(
    (state: RootState) => state.userInterface,
  );

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

  return show ? (
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
        </div>
      </form>
      {!hideFilterBox && <FilterBox />}
      <Suggestions />
    </div>
  ) : (
    <></>
  );
};
