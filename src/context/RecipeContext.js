import React, { createContext, useReducer } from 'react';
import RecipeReducer from './reducers/RecipeReducer';

export const RecipeContext = createContext();

const initialState = {
  recipe_data: [],
  api_loading: false
}

const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState)

  return (
    <RecipeContext.Provider value={{
      recipeState: state,
      dispatch
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;