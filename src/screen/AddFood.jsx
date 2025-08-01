import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFood.css';

const AddFood = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', img: '', optionhalf: '', optionfull: '', category: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/addFood", {
      method: 'POST', headers: {"Content-Type":"application/json"}, body: JSON.stringify({
        name: data.name, category: data.category, img: data.img, option: { half: data.optionhalf, full: data.optionfull }
      })
    });
    const json = await resp.json();
    if (json.success) {
      alert("Food added");
      navigate('/');
    } else alert(json.error || "Failed");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Add Food</h2>
        <input type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} required />
        <input type="text" placeholder="Image URL" name="img" value={data.img} onChange={handleChange} required />
        <input type="text" placeholder="Price (Half)" name="optionhalf" value={data.optionhalf} onChange={handleChange} required />
        <input type="text" placeholder="Price (Full)" name="optionfull" value={data.optionfull} onChange={handleChange} required />
        <select name="category" value={data.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Main Course">Main Course</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="South Indian">South Indian</option>
          <option value="North Indian">North Indian</option>
        </select>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
