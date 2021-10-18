const SearchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_INPUT":
      return {
        ...state,
        searchValue: action.payload
      };
    default: return state;
  }
}

export default SearchReducer;