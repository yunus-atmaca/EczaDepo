import {
  ADD_PROD_TO_CART,
  DELETE_PROD_FROM_CART,
  UPDATE_PROD_FROM_CART
} from "../actionTypes";

const initialState = {
  medicines: []
};

export default function (state = initialState, action) {
  //console.debug('CART-ACTION: ', action)
  switch (action.type) {
    case ADD_PROD_TO_CART: {
      //console.debug('ADD_PROD_TO_CART')
      const { id, cartItem } = action.payload
      return {
        ...state,
        medicines: [...state.medicines, { id, cartItem }]
      };
    }
    case DELETE_PROD_FROM_CART: {
      //console.debug('DELETE_PROD_FROM_CART')
      const { id } = action.payload
      return {
        ...state,
        medicines: state.medicines.filter((medicine: any) => medicine.id !== id)
      };
    }
    case UPDATE_PROD_FROM_CART: {
      //console.debug('UPDATE_PROD_FROM_CART')
      const { oldCartItemId, newCartItem } = action.payload
      return {
        ...state,
        medicines: (() => {
          let oldValIndex = state.medicines.findIndex((medicine: any) => medicine.id === oldCartItemId)
          if (oldValIndex === -1) {
            return state.medicines
          } else {
            let tempMedicines: any = [...state.medicines]
            tempMedicines[oldValIndex] = {
              cartItem: newCartItem,
              id: oldCartItemId
            }

            return tempMedicines
          }
        })()
      };
    }
    default:
      return state;
  }
}