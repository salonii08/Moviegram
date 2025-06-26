import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { apiRequest } from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



const Profile = () => {
  const { currentUser, setCurrentUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const logout = async () => {
    try {
        setLoading(true);
      const res = await apiRequest.post("/auth/logout");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log(res.data);
    } finally{
        setLoading(false);
    }
  };

  if (!currentUser) {
    return <div className="text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-black rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col items-start space-y-6">
            <div className="flex justify-between items-center w-full">
              <h1 className="font-serif text-2xl font-bold text-red-600 hover:text-red-400 ">Profile</h1>
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="mb-6 relative">
                <img
                  src={currentUser?.avatar  || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                  alt="User Avatar"
                  className="w-38 h-38 rounded-full object-cover border-4 border-red-500 shadow-lg hover:border-red-900 transition duration-200"
                />
              </div>
            </div>

            <div className="w-full space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-sm font-medium text-white uppercase tracking-wider">
                  Username
                </h2>
                <p className="mt-1 text-lg font-semibold text-white">
                  {currentUser.username}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-sm font-medium text-white uppercase tracking-wider">
                  Email
                </h2>
                <p className="mt-1 text-lg font-semibold text-white">
                  {currentUser.email}
                </p>
              </div>
            </div>
            
            <Link to="/update"
            className=" mt-6 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;