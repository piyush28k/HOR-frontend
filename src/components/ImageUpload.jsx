import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("myImage", file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData);
      const imageUrl = response.data.imageUrl;
      setUploadedImageUrl(imageUrl);
      if (onUpload) onUpload(imageUrl); // Call parent with URL
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-start">
        <label className="text-sm font-medium text-gray-700">
          Choose an image:
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {/* {uploadedImageUrl && (
                <div className="mt-2">
                    <p>Upload Successful!</p>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ width: '150px' }} />
                </div>
            )} */}
    </div>
  );
}

export default ImageUploader;
