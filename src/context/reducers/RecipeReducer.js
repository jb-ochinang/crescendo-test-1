const RecipeReducer = (state, action) => {
  switch (action.type) {
    case "API_LOADING":
      return {
        ...state,
        api_loading: action.payload,
      };
    case "GET_RECIPES":
      return {
        ...state,
        recipe_data: action.payload,
      };
    default: return state;
  }
}

export default RecipeReducer;