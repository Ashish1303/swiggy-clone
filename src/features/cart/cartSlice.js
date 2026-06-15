import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  const stored = localStorage.getItem('GharKaBite_clone_cart');
  return stored ? JSON.parse(stored) : { items: [], totalAmount: 0, totalItems: 0 };
};

const calculateSummary = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return { totalAmount, totalItems };
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const exists = state.items.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      Object.assign(state, calculateSummary(state.items));
      localStorage.setItem('GharKaBite_clone_cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, calculateSummary(state.items));
      localStorage.setItem('GharKaBite_clone_cart', JSON.stringify(state));
    },
    increaseQty(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item) item.quantity += 1;
      Object.assign(state, calculateSummary(state.items));
      localStorage.setItem('GharKaBite_clone_cart', JSON.stringify(state));
    },
    decreaseQty(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      Object.assign(state, calculateSummary(state.items));
      localStorage.setItem('GharKaBite_clone_cart', JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem('GharKaBite_clone_cart');
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
