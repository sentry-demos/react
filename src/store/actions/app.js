import * as actionTypes from './actionTypes';

export const buyItem = (item) => {
  return {
    type: actionTypes.BUY_ITEM,
    item: item
  };
};

export const resetCart = () => {
  return {
    type: actionTypes.RESET_CART,
  }
}