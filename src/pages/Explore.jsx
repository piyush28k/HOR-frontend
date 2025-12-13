import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Explore() {

  const navigate = useNavigate()

  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [datas, setdatas] = useState([]);
  const [res, setRes] = useState([]);

  useEffect(()=>{
    const fetch = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/allprofiles`)
        setdatas(response.data)
        setRes(response.data)
      }catch(error){
        console.error("error fetching profiles data :", error.response.data || error.message)

      }
    }
    fetch()
  },[])
  
  // console.log(datas)

  const handleSubmit = (e) => {
    const result = datas.filter((data) => {
      const res = service ? data.title?.toLowerCase().includes(service.toLowerCase()) : true;
      const loc = location ? data.location?.toLowerCase().includes(location.toLowerCase()) : true;
      console.log("res: "+ res,"loc: "+ loc)
      return res && loc;
    });
    setRes(result);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        {/* --- 1. Search Section (White & Yellow Theme) --- */}
        <div className="w-full border-b border-gray-200 bg-white flex flex-col items-center justify-center py-10 px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Job Title Input */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <label
                htmlFor="Service"
                className="text-lg font-semibold text-gray-700"
              >
                Service:
              </label>
              <input
                id="Service"
                type="text"
                placeholder="e.g. Frontend Developer"
                className="border-2 border-gray-300 rounded-lg py-2 px-4 text-lg w-full md:w-auto
                           focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                onChange={(e) => setService(e.target.value)}
                value={service}
              />
            </div>

            {/* Location Input */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <label
                htmlFor="location"
                className="text-lg font-semibold text-gray-700"
              >
                Location:
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Bhopal"
                className="border-2 border-gray-300 rounded-lg py-2 px-4 text-lg w-full md:w-auto
                           focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSubmit}
            className="text-lg cursor-pointer bg-amber-400 text-gray-900 font-semibold px-8 py-2 mt-6 rounded-lg shadow-md
                           hover:bg-amber-500 transition-all duration-200"
          >
            Search
          </button>
        </div>

        {/* Job Cards Section */}
        <div className="max-w-7xl mx-auto p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/*map over the data to create cards */}
            {res.length === 0 && (
              <div className="text-2xl">No Freelancer Found!</div>
            )}
            {res.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-200 
                           hover:shadow-xl hover:border-amber-400 transition-all duration-300
                           flex flex-col p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-amber-400"
                    src={job.photo || "https://...default-logo.png"}
                    alt={`${job.company} logo`}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {job.name || "Job Title"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {job.title || "Company Name"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-gray-700 text-sm leading-relaxed flex-grow">
                  {job.bio ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto accusantium natus, numquam ratione illo."}
                </p>

                <button onClick={()=> (navigate(`/explore/${job.userId}`))}
                  className="bg-amber-400 hover:bg-amber-500 mt-5 w-full text-gray-900 font-semibold py-2 rounded-lg
                                   transition-all duration-200 cursor-pointer"
                >
                  Hire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
