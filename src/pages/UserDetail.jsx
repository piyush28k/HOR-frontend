import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetail() {
  const { id } = useParams();
  const [data,usedata]= useState([])

  useEffect(() => {
    const fetch = async () => {
    try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/profile/getprofile`,
          { userId: id }
        );
        console.log(res.data);
        usedata(res.data)
      } catch (error) {
        console.error(
          "error fetching in userDetail :",
          error.response.data || error.message
        );
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white font-sans">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src= {`${data?.photo}`}
            alt="Haad Profile"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900"> {data?.name} <span className="text-gray-500 font-normal text-base">{data?.email}</span></h1>
            
            {/* Rating and Level */}
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-lg font-semibold text-gray-800">4.9</span>
              <div className="flex text-yellow-500">
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
                <span className="text-xl">★</span>
              </div>
              <span className="text-gray-500 text-sm">(305)</span>
              <span className="text-green-600 font-bold text-sm">Level 2+++</span>
            </div>
            
            {/* Tagline */}
            <p className="text-gray-700 mt-1 italic">{data?.titlez}</p>
            
            {/* Location and Language */}
            <div className="flex text-gray-500 text-sm mt-1">
              <span> {data?.location} </span>
              <span className="mx-4">•</span>
               {data?.languages?.map((elem, index)=>(
                <div key={index}>{elem} {index < data.languages.length - 1 && ","} </div>
              ))} 
            </div>
          </div>
        </div>
        
      </div>

      {/* Main Content Area: Left Column (About/Skills) and Right Column (Contact) */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        
        {/* Left Column: About me and Skills */}
        <div className="lg:w-2/3">
          
          {/* About Me */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About me</h2>
            <p className="text-gray-700 leading-relaxed">
              {data?.bio}
            </p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data?.skills?.map((elem,index)=>(
                <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{elem}</span>

              ))}
              
            </div>
          </section>
        </div>

        {/* Right Column: Contact Card */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
            
            {/* Contact Card Header */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="/path-to-haad-image.png" // Placeholder
                alt="Haad Thumbnail"
              />
              <div>
                <p className="font-semibold text-gray-900">Haad</p>
                <p className="text-sm text-gray-500">Online - 09:28 PM local time</p>
              </div>
            </div>
            
            {/* Contact Button */}
            <button className="flex items-center justify-center w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.54A9.732 9.732 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span>Contact me</span>
            </button>

            {/* Response Time */}
            <p className="text-center text-sm text-gray-600 mt-3">Average response time: 1 hour</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Message Bar (Optional, as seen in the screenshot) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex items-center justify-start lg:hidden">
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="/path-to-haad-image.png" // Placeholder
            alt="Haad Thumbnail"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900">Message Haad</p>
            <p className="text-xs text-gray-500">Online • Avg. response time: 1 hour</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-10">
              {data?.gigs?.map((gig, idx) => (
                <div
                  key={idx}
                  className="w-72 bg-white rounded-xl shadow-md flex-shrink-0"
                >
                  <img
                    src={gig.photo}
                    alt={gig.title}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-3">
                    <h4 className="text-md font-semibold">{gig.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {gig.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span className="font-bold text-primary">
                        ₹{gig.price}
                      </span>
                      <span className="font-semibold">delivered in: {gig.deliveryDate} Days</span>
                      <span className="text-gray-500">{gig.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

    </div>
    </>
  )
}

export default JobDetail;
