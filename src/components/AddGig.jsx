import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import ImageUploader from "./ImageUpload";
import axios from 'axios'

function AddGig() {
  const { user } = useAuth();
  const userId = user;

  const [data, setData] = useState({
    title: "",
    photo: "",
    description: "",
    price: "",
    deliveryDate: "",
  });

  console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setData((prev) => ({ ...prev, photo: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/profile/addgig`,
        { ...data, userId }
      );
      console.log(res);
      console.log("gig add successful")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Add New Gig
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
        <ImageUploader onUpload={handleImageUpload} />
        {data.photo ? (
          <img
            src={data.photo}
            alt="Profile"
            className="w-24 h-24 object-cover rounded mt-2"
          />
        ) : (
          <p className="text-sm text-gray-500 mt-2">No image uploaded yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={data.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <textarea
          name="description"
          placeholder="Gig Description"
          value={data.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (in ₹)"
          value={data.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="text"
          name="deliveryDate"
          placeholder="Delivery Time (e.g., 5 days)"
          value={data.deliveryDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition"
        >
          Add Gig
        </button>
      </form>
    </div>
  );
}

export default AddGig;
// title, photo, description, price, deliveryDate
