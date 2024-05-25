/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png";
import { useRouter } from "next/navigation";
import router from "next/router";
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",

  });

  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state
  const router = useRouter(); // Use the useRouter hook

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
        document.cookie =
          "auth_token=${token}; path=/; max-age=86400; secure; samesite=strict";
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
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-8 bg-dark-grey">
      <div className="max-w-md w-full text-gray-600 space-y-8 bg-gray-800 shadow-lg rounded-2xl p-8">

        <div className="text-center">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={50}
            className="mx-auto mb-4 rounded-lg"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a
                href="/pages/authentication/signup"
                className="font-medium text-teal-500 hover:text-teal-400"
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
              type="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-gray-900 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
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
              className="w-full mt-2 px-3 py-2 text-white bg-gray-900 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-teal-500 hover:bg-teal-400 active:bg-teal-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>

        <div className="relative">
          <span className="block w-full h-px bg-gray-700"></span>
          <p className="inline-block w-fit text-sm bg-gray-800 px-2 absolute -top-2 inset-x-0 mx-auto text-gray-400">
            Or continue with
          </p>
        </div>
        <div className="space-y-4 text-sm font-medium">
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-700 rounded-lg hover:bg-gray-700 duration-150 active:bg-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-700 rounded-lg hover:bg-gray-700 duration-150 active:bg-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937"
                fill="#1DA1F2"
              />
            </svg>
            Continue with Twitter
          </button>
        </div>
        <div className="text-center">
          <a
                href="/pages/authentication/resetPassword"
                className="text-teal-500 hover:text-teal-400"
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





