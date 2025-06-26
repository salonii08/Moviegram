import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../Services/api"; // Make sure this has baseURL & headers set

const Update = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Ensure user is loaded before showing form
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove password field if it's empty
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password;
      }

      const res = await apiRequest.put(`/user/${currentUser._id}`, payload);

      setCurrentUser(res.data); // Update AuthContext
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed. Please check the inputs and try again.");
    }
  };

  if (!currentUser) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md mx-auto bg-black rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
