import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const EditProfile = () => {
  const { user,profile } = useAuth();
  const [formData, setFormData] = useState({
  name: "",
  photo: "",
  title: "",
  location: "",
  bio: "",
  languages: [],
  skills: [],
  Experience: 0,
  education: [],
  certifications: [],
});

useEffect(() => {
  if (profile) {
    setFormData({
      name: profile.name || "",
      photo: profile.photo || "",
      title: profile.title || "",
      location: profile.location || "",
      bio: profile.bio || "",
      languages: profile.languages || [],
      skills: profile.skills || [],
      Experience: profile.Experience || 0,
      education: profile.education || [],
      certifications: profile.certifications || [],
    });
  }
}, [profile]);

  console.log(formData?.photo)

  // Update field values

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(",").map((v) => v.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:4000/profile/updateprofile", { userId: profile?.userId, ...formData }, { withCredentials: true })
      .then((res) => alert("Profile Updated Successfully"))
      .catch((err) => console.log(err));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4  h-96 flex flex-col max-w-3xl mx-auto space-y-4">
      
      <label htmlFor="name">Name</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="name" value={formData?.name} onChange={handleChange} placeholder="Name" />
      
      <label htmlFor="photo">Photo URL</label>
      <input type='file' accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0])})} />
      {/* <input className="border-1 rounded-sm p-2 outline-none"  type="text" name="photo" value={formData.photo} onChange={handleChange} placeholder="Photo URL" /> */}
      
      <label htmlFor="title">Title</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      
      <label htmlFor="location">Location</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />

      <label htmlFor="bio">Bio</label>
      <textarea  name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      
      <label htmlFor="languages">Languages</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="languages" onChange={(e) => handleArrayChange(e, "languages")} placeholder="Languages (comma separated)" />
      
      <label htmlFor="skills">Skills</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="skills" onChange={(e) => handleArrayChange(e, "skills")} placeholder="Skills (comma separated)" />
      
      {/* <label htmlFor="Experience">Years of Experience</label>
      <input type="number" name="Experience" value={formData.Experience} onChange={handleChange} placeholder="Years of Experience" /> */}
     
      <label htmlFor="certifications">Certifications</label>
      <input className="border-1 rounded-sm p-2 outline-none" type="text" name="certifications" onChange={(e) => handleArrayChange(e, "certifications")} placeholder="Certifications (comma separated)" />

      {/* Optional: you can map education or gigs as well */}
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
    </form>
  );
};

export default EditProfile;