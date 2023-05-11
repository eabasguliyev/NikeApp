import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;

      const existingCartItem = state.items.find(
        (item) => item.product.id === newProduct.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;

      const existingCartItem = state.items.find(
        (item) => item.product.id === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += amount;

        if (existingCartItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        }
      }
    },
  },
});

export const selectNumberOfItems = (state) => state.cart.items.length;
export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, deliveryFee) => subtotal + deliveryFee
);
