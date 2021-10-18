import React, { createContext, useReducer } from 'react';
import SearchReducer from './reducers/SearchReducer';

export const SearchContext = createContext();

const initialState = {
  searchValue: ''
}

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState)

  return (
    <SearchContext.Provider value={{
      searchState: state,
      dispatch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;