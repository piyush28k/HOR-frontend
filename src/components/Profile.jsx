import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import EditProfile from "./EditProfile.jsx";

const ProfilePage = () => {

  const { profile } = useAuth();
  console.log("Profile Data:", profile);

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row gap-8 p-6 lg:px-20">
        <aside className="h-5/6 lg:w-1/3 lg:mx-20 border-1 border-gray-300 p-6 rounded-xl lg:sticky lg:top-40">
          <div className="flex h-96 flex-col items-center ">
            <img
              src={profile?.photo}
              alt="Profile"
              className="w-34 h-34 rounded-full object-cover"
            />
            <h2 className="mt-4 mb-1 text-3xl text-gray-700 font-semibold">
              {profile?.name}
            </h2>
            <p className=" text-gray-500">{profile?.email}</p>
            <div className="border-1 w-80 mt-6 border-gray-300 my-2"></div>

            <div className="mt-2 text-sm text-black left-4 gap-1">
              <p className="mt-2 font-medium">{profile?.location}</p>
              <div>
                {profile?.languages?.map((exp, ind) => (
                  <span key={ind} className="font-medium">
                    {ind !== 0 && ", "}
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Edit
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="h-full font-bold text-lg">Hello!</h3>
                <EditProfile />
              </div>
            </dialog>
          </div>
        </aside>

        {/* Right Scrollable Content */}
        <section className="w-full lg:w-1/2 space-y-6">
          {/* About */}
          <div className=" p-6">
            <h3 className="text-5xl my-6 font-semibold mb-2">
              Hello! I am {profile?.name}
            </h3>
            <p className="text-lg font-medium text-gray-500">
              {profile?.title}
            </p>
          </div>

          <div className="border-1 p-6 border-gray-300 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            <p className="text-gray-600">{profile?.bio}</p>
          </div>

          <div className="p-6 rounded-xl">
            <h3 className="text-xl font-semibold mt-16 mb-2">Certifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {profile?.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 border-1 border-gray-300 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {profile?.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 border border-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* {profile?.giggs?.length > 0 && ( */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Gigs</h3>
            <div className="flex overflow-x-auto gap-4 p-2 rounded-box bg-base-200 scrollbar-hide">
              {profile?.gigs.map((gig, idx) => (
                <div
                  key={idx}
                  className="w-72 bg-white rounded-xl shadow-md flex-shrink-0"
                >
                  <img
                    src={gig.img}
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
                        {gig.price}
                      </span>
                      <span className="text-gray-500">{gig.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* )} */}

          <div className="h-screen w-full mt-20">
            <h3 className="text-lg font-semibold mb-6">Feedback</h3>
            <div className="space-y-4">
              {profile?.feedback.map((feedback, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-6 border-1 border-gray-300 rounded-xl"
                >
                  <img
                    src={feedback.photo}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{feedback.name}</p>
                    <p className="text-gray-600">{feedback.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(feedback.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
