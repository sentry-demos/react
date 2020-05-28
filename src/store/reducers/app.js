/*global Sentry*/
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: [],
};

const buyItem = (state, action) => {
  const cart = [].concat(state.cart);
  cart.push(action.item);

  Sentry.configureScope(scope => {
    scope.setExtra('cart', JSON.stringify(cart));
  });
  Sentry.addBreadcrumb({
    category: 'cart',
    message: 'User added ' + action.item.name + ' to cart',
    level: 'info'
  });

  return {
    ...state,
    cart: cart
  }
}

const resetCart = (state, action) => {
  Sentry.configureScope(scope => {
    scope.setExtra('cart', '');
  });
  Sentry.addBreadcrumb({
    category: 'cart',
    message: 'User emptied cart',
    level: 'info'
  });
  return {
    ...state,
    cart: [],
  }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.BUY_ITEM: return buyItem(state, action);
      case actionTypes.RESET_CART: return resetCart(state, action);
      default:
        return state;
    }
};

export default reducer;