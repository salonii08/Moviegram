import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { apiRequest } from "../../Services/api";

const Navbar = () => {
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  // console.log(currentUser)
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/50 to-transparent text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to='/'>
        <h1 className="text-3xl font-extrabold tracking-wide text-red-600 drop-shadow-sm">
          Moviegram
        </h1>
        </Link>
        
        

        {/* Right buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/favorites">
            <button className="bg-[#E50914] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#F40612] transition-colors duration-200 shadow-md">
              Favourites
            </button>
          </Link>
          {/* <button className="bg-[#E50914] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#F40612] transition-colors duration-200 shadow-md" onClick={handleLogout}>Log out</button> */}

          {currentUser ? (
            <Link to="/profile">
            <div className="flex items-center space-x-2">
              <img
                src={
                  currentUser.avatar ||
                  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                }
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
              <span>{currentUser.username}</span> 
            </div>
            
            </Link>
            
          ) : (
            <>
              <Link to="/signup">
                <button className="bg-[#E50914] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#F40612] transition-colors duration-200 shadow-md">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md transition duration-300">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;