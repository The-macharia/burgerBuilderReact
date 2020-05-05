import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      });

    case actionTypes.REMOVE_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      });

    case actionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
      });

    case actionTypes.ERROR_INGREDIENT:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
