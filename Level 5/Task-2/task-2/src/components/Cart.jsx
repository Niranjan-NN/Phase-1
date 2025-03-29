import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="cart">
       Cart: <span className="cart-count">{cart.length}</span>
    </div>
  );
};

export default Cart;
