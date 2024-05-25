/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter

export default function Login() {
  const router = useRouter(); // Use the useRouter hook
  const [formData, setFormData] = useState({
    username: "",
    password: "", // Include password in your state
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // This will update the right part of the state based on the input name
    }));
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/account/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Guest login successful", data);
        const token = data.accessToken;
        localStorage.setItem("token", token);
        document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        router.push("/pages/home"); // Redirect to dashboard
      } else {
        throw new Error(data.message || "Failed to log in as guest");
      }
    } catch (error) {
      console.error("Guest login error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:8000/account/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        const token = data.accessToken;
        localStorage.setItem("token", token);
        document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        router.push("/pages/home"); // Redirect to home page
      } else {
        throw new Error(data.message || "Failed to log in");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-gray-600 space-y-8 bg-dark-grey shadow-lg rounded-lg p-8">
        {/* Create a grey container with padding, shadow, and rounded corners */}
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="text-white">
              Don't have an account?{" "}
              <a
                href="javascript:void(0)"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-white">Username</label>
            <input
              type="text" // Change the input type to "text" for the username
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>

        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-dark-grey px-2 absolute -top-2 inset-x-0 mx-auto text-slate-50">
            Or continue with
          </p>
        </div>
        <div className="space-y-4 text-sm font-medium">
          <button
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
        </div>
        <div className="text-center">
          <a
            href="javascript:void(0)"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}