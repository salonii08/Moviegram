// import {  createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {

//     const [currentUser, setCurrentUser] = useState(
//         JSON.parse(localStorage.getItem("user")) || null
//     );
 
//     //to update the user
//     const updateUser = (data)=>{
//         setCurrentUser(data)
//     };

//     useEffect(()=>{
//         localStorage.setItem ("user",JSON.stringify(currentUser))
//     }, [currentUser])

//     return(
//         <AuthContext.Provider value={{currentUser, updateUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Initialize currentUser safely
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined" 
        ? JSON.parse(storedUser) 
        : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const [isLoading , setIsLoading] = useState(true);
  // Update user
  const updateUser = (data) => {
    setCurrentUser(data);
    if (data?.token) {
      localStorage.setItem('token',data.token);
    }
  };

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user"); // Clear invalid or null user data
    }
    setIsLoading(false);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser,setCurrentUser,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};