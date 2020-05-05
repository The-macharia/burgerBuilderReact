import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const setIngredientError = () => {
  return {
    type: actionTypes.ERROR_INGREDIENT,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(setIngredient(res.data));
      })
      .catch((res) => {
        dispatch(setIngredientError());
      });
  };
};
