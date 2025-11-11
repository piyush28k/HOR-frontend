import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import ImageUploader from "../components/ImageUpload"; // Assuming this is your styled uploader

const EditProfile = () => {
    const { user, profile } = useAuth();
    // Default form state is empty
    const [formData, setFormData] = useState({
        name: "", photo: "", title: "", location: "", bio: "",
        languages: [], skills: [], Experience: 0, education: [], certifications: []
    });

    // This useEffect correctly populates the form with existing profile data
    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "", photo: profile.photo || "",
                title: profile.title || "", location: profile.location || "",
                bio: profile.bio || "", languages: profile.languages || [],
                skills: profile.skills || [], Experience: profile.Experience || 0,
                education: profile.education || [], certifications: profile.certifications || [],
            });
        }
    }, [profile]);

    // --- State Management and Handlers (No Changes Here) ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e, field) => {
        const value = e.target.value.split(",").map((v) => v.trim()).filter(Boolean); // filter(Boolean) removes empty strings
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}/profile/updateprofile`, { userId: profile?.userId, ...formData }, { withCredentials: true })
            .then(() => (window.location.reload()))
            .catch((err) => console.log(err));
    };

    const handleImageUpload = (url) => {
        setFormData((prev) => ({ ...prev, photo: url }));
    };

    if (!profile) return <div className="text-center p-10">Loading profile...</div>;

    // --- NEW, ENHANCED JSX ---
    return (
        <div className="max-w-3xl mx-auto px-4 py-4">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Edit Your Profile</h2>

  {/* Image Section */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
    <ImageUploader onUpload={handleImageUpload} />
    {formData.photo ? (
      <img
        src={formData.photo}
        alt="Profile"
        className="w-24 h-24 object-cover rounded mt-2"
      />
    ) : (
      <p className="text-sm text-gray-500 mt-2">No image uploaded yet.</p>
    )}
  </div>

  <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 rounded shadow">

    <div>
      <label className="font-semibold">Name</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
      />
    </div>

    <div>
      <label className="font-semibold">Title</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. Front-End Developer"
      />
    </div>

    <div>
      <label className="font-semibold">Location</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="City, Country"
      />
    </div>

    <div>
      <label className="font-semibold">Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Write something about yourself..."
        className="border rounded p-2 w-full outline-none"
        rows="3"
      />
      {formData.bio === "" && <p className="text-sm text-gray-400">You haven’t added a bio yet.</p>}
    </div>

    <div>
      <label className="font-semibold">Languages</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="languages"
        onChange={(e) => handleArrayChange(e, "languages")}
        placeholder="e.g. English, Hindi, Spanish"
      />
      {formData.languages.length === 0 && <p className="text-sm text-gray-400">No languages added yet.</p>}
    </div>

    <div>
      <label className="font-semibold">Skills</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="skills"
        onChange={(e) => handleArrayChange(e, "skills")}
        placeholder="e.g. React, Node.js, MongoDB"
      />
      {formData.skills.length === 0 && <p className="text-sm text-gray-400">Add your top 3–5 skills.</p>}
    </div>

    <div>
      <label className="font-semibold">Certifications</label>
      <input
        className="border rounded p-2 w-full outline-none"
        type="text"
        name="certifications"
        onChange={(e) => handleArrayChange(e, "certifications")}
        placeholder="e.g. AWS Certified, Coursera ML Certificate"
      />
      {formData.certifications.length === 0 && (
        <p className="text-sm text-gray-400">You haven’t listed any certifications yet.</p>
      )}
    </div>

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
    >
      Save Changes
    </button>
  </form>
</div>

    );
};

export default EditProfile;