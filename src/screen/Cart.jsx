import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Cart.css';
import { toast } from 'react-toastify';


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  if (!cart.length) return (
    <div className="container cart-empty">
      <h1>Your cart is empty</h1>
      <Link to="/">Order now</Link>
    </div>
  );

  return (
    <div className="container cart">
      <table className="cart-table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Price</th><th>Qty</th><th>Total</th><th>Remove</th></tr>
        </thead>
        <tbody>
          {cart.map((i, idx) => (
            <tr key={i.id}>
              <td>{idx + 1}</td>
              <td>{i.name}</td>
              <td>₹{i.price}</td>
              <td>{i.quantity}</td>
              <td>₹{i.price * i.quantity}</td>
              <td><Button onClick={() => dispatch(removeFromCart(i.id))}>Remove</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="cart-total">Total: ₹{total}</h2>
      <div className="cart-actions">
        <Button variant="success" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        <Button variant="primary">Payment Options</Button>
      </div>
    </div>
  );
};

export default Cart;
