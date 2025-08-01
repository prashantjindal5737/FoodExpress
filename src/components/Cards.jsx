import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
;
import './Cards.css';

const Cards = ({ fooditems, quantity }) => {
  const dispatch = useDispatch();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const cart = useSelector(state => state.cart);
  useEffect(() => setSize(priceRef.current.value), []);

  const handleAdd = () => {
    dispatch(addToCart({
      id: fooditems._id,
      name: fooditems.name,
      price: Number(size),
      quantity: Number(qty),
    }));
    toast.success("Added to cart");
  };

  const finalPrice = Number(size) * Number(qty);

  return (
    <div className="card">
      <img
        className="food-img"
        src={fooditems.img}
        alt={fooditems.name}
        onError={e => e.target.src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"}
      />
      <h3>{fooditems.name}</h3>
      <div className="selectors">
        <select value={qty} onChange={e => setQty(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <select ref={priceRef} onChange={e => setSize(e.target.value)}>
          {Object.entries(quantity).map(([key, val]) => (
            <option key={key} value={val}>{key} - ₹{val}</option>
          ))}
        </select>
      </div>
      <p className="price">₹{finalPrice}</p>
      <Button className="btn add-btn" onClick={handleAdd}>Add to Cart</Button>
    </div>
  );
};

export default Cards;
