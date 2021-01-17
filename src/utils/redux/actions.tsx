import { CartItem } from "../CartItem";
import {
  ADD_PROD_TO_CART,
  DELETE_PROD_FROM_CART,
  UPDATE_PROD_FROM_CART
} from "./actionTypes";

let nextProdId = 0;

export const addProdToCart = (cartItem: CartItem) => ({
  type: ADD_PROD_TO_CART,
  payload: {
    id: ++nextProdId,
    cartItem: cartItem
  }
});

export const deleteProdFromCart = (id: number) => ({
  type: DELETE_PROD_FROM_CART,
  payload: {
    id: id
  }
});

export const updateProdFromCart = (oldCartItemId: number, newCartItem: CartItem) => ({
  type: UPDATE_PROD_FROM_CART,
  payload: {
    oldCartItemId: oldCartItemId,
    newCartItem: newCartItem
  }
});