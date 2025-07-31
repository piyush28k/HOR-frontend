import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthProvider.jsx";

const Login = ({toggleForm}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = {
      email:name,
      password
    }
    // console.log(form.name, form.password)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, form)
      alert("Login successful!");

      setName("")
      setPassword("");
      setError("");
      console.log(res.data._id)

      localStorage.setItem("user", JSON.stringify(res.data._id));
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
    
  };

  const { googleLogin } = useAuth();


  return (
    <div className="min-h-full flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      <h3 className="text-center my-2">OR</h3>
       <GoogleLogin
         onSuccess={async (credentialResponse) => {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/googleLogin`, { token: credentialResponse.credential }, { withCredentials: true });
          localStorage.setItem("user", JSON.stringify(res.data._id));
          window.location.reload();
        }}
        onError={() => {
          console.log("Google login failed");

        }}
      />
        <p className="text-center cursor-pointer text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a onClick={toggleForm} className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;