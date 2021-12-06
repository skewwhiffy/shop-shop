import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      const newCart = state.cart.filter((it) => it._id !== action._id);
      return {
        ...state,
        cart: newCart,
        cartOpen: newCart.length > 0,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((it) => {
          if (it._id !== action._id) {
            return it;
          }
          return {
            ...it,
            purchaseQuantity: action.purchaseQuantity
          };
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      }
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      }
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
