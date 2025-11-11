import React from "react";
import {useNavigate} from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row px-6 md:px-16 lg:px-40">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-10 flex flex-col justify-center text-center lg:text-left mt-10 lg:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
            Find the right <span className="bg-amber-200">freelancer</span> for
            your work.
          </h1>
          <p className="text-lg md:text-xl py-4 md:py-6">
            Choose from 29,325 independent freelancers available for work.
          </p>
          <h2 className="text-2xl md:text-3xl">
            Hire a professional <span className="font-bold">NOW!</span>
          </h2>
          <button onClick={()=>(navigate("/explore"))} className="bg-yellow-400 px-5 py-3 rounded-xl font-bold mt-4 hover:bg-yellow-500 transition cursor-pointer">
            Explore
          </button>
        </div>

        {/* Right Side */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
          {/* Floating Card */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 lg:static lg:translate-x-36 lg:translate-y-30 lg:-ml-40 bg-white shadow-xl p-5 rounded-xl w-64 text-center">
            <h1 className="text-2xl font-bold">Alina Snow</h1>
            <h1 className="text-gray-600">Software Developer</h1>
          </div>

          {/* Profile Image */}
          <img
            className="rounded-full object-cover w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 mt-16 lg:mt-0"
            src="https://imgs.search.brave.com/zM3sk4FbAC5qQkaDYLaK_QG3eokUs5gQLETVbrKb9v8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjA5/OTQwMzE4MC9waG90/by9sYXVnaGluZy15/b3Vnbi1idXNpbmVz/c3dvbWFuLXN0YW5k/aW5nLXdpdGgtaGVy/LWFybXMtY3Jvc3Nl/ZC1hZ2FpbnN0LWFu/LW9mZmljZS13YWxs/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1rbjZUTTV5LTI2/b2hrdW9BVTlGaVdu/NHBZb3lWUFM3eGZX/TFZ5QkdqX1RBPQ"
            alt="Profile"
          />
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-gray-700 py-10 px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-10">
        <img
          className="h-12 md:h-16 lg:h-20"
          src="https://imgs.search.brave.com/49kIE-sKnZSuWhcE1snsmfjtk0JAL3bhGKYYsSZx1LA/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/ZWRpZ2l0YWxhZ2Vu/Y3kuY29tLmF1L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9uZXctUGF5/UGFsLWxvZ28td2hp/dGUtcG5nLWhvcml6/b250YWwtbGFyZ2Ut/c2l6ZS5wbmc"
          alt="PayPal"
        />
        <img
          className="h-12 md:h-16 lg:h-20"
          src="https://cdn-icons-png.flaticon.com/128/5968/5968919.png"
          alt="Google"
        />
        <img
          className="h-12 md:h-16 lg:h-20"
          src="https://cdn-icons-png.flaticon.com/128/5968/5968929.png"
          alt="Microsoft"
        />
        <img
          className="h-12 md:h-16 lg:h-20"
          src="https://cdn-icons-png.flaticon.com/128/4817/4817607.png"
          alt="Amazon"
        />
      </div>

      {/* Placeholder for Next Section */}
      <div className="h-screen w-full bg-red-400"></div>
    </>
  );
}

export default Home;
