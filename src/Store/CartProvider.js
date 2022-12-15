import React, { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "ADD":
      let updatedItems = [];

      const updatedTotalAmount =
        prevState.totalAmount +
        action.payLoad.item.price * action.payLoad.item.amount;

      //finds and returns the index of the item that already exist
      const existingItemIndex = prevState.items.findIndex((item) => {
        return item.id === action.payLoad.item.id;
      });
      const existingItem = prevState.items[existingItemIndex];
      if (existingItem) {
        const addedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payLoad.item.amount,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingItemIndex] = addedItem;
      } else {
        updatedItems = prevState.items.concat(action.payLoad.item);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE":
      const existingIndex = prevState.items.findIndex((item) => {
        return item.id === action.payLoad.id;
      });
      const copyItem = prevState.items[existingIndex];
      const newTotalAmount = prevState.totalAmount - copyItem.price;

      let newItems = [];
      if (copyItem.amount === 1) {
        newItems = prevState.items.filter((item) => {
          return item.id !== action.payLoad.id;
        });
      } else {
        const newItem = { ...copyItem, amount: copyItem.amount - 1 };
        newItems = [...prevState.items];
        newItems[existingIndex] = newItem;
      }

      return { items: newItems, totalAmount: newTotalAmount };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatch({ type: "ADD", payLoad: { item: item } });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE", payLoad: { id: id } });
  };
  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
