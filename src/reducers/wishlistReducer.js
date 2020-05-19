import { GET_CART, GET_WISHLIST } from "../actions/types";

const initialState = {
  wishlist: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
}
