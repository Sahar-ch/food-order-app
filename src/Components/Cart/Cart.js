import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const removeItemCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeItemCartHandler.bind(null, item.id)}
            onAdd={addItemCartHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal hideCartHandler={props.closeHandler}>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.closeHandler}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
