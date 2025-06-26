import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../Services/api'

const SignUp = () => {
  const [error, setError] = useState ("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() 
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    setError("")

    //basic way
    const formData = new FormData(e.target);
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    //shortcut
    //const formData = new FormData(e.target);
    //const inputs = object.formEnteries(formData);

    try {
      const res = await apiRequest.post("/auth/register",{
        username,
        email,
        password
      })
      console.log(res)
      navigate("/login")
    } catch (error) {
      setError(error.res?.data?.msg || "Something went wrong")
      console.log(error);  
    }finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-[#141414]">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name='username'
            placeholder="Enter your Full Name"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name='password'
            placeholder="Create a password"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

      

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
        >
          Sign Up
        </button>
        {error && <span className='text-red-500 text-sm'>{error}</span>}
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-red-500 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  </div>
  )
}

export default SignUp
