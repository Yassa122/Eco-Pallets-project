/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendMail = async (name: string, email: string) => {
    try {
      const response = await fetch(
        "http://localhost:8888/email/verification-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This is needed to handle cookies if you're using them for authentication
          body: JSON.stringify({ name, email }), // Include the email in the request body
        }
      );
    } catch (error) {
      throw new Error("Failed to send mail: " + error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMail(formData.firstName, formData.email);
    if (
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      let flag = false;
      let _id;
      let payload;
      if (token) {
        payload = JSON.parse(atob(token.split(".")[1]));
        const userRole = payload.role;
        if (userRole === "guest") {
          flag = true;
          _id = payload.id;
        }
      }
      if (flag == true) {
        const mergedData = { ...formData, _id };
        console.log(mergedData);
        //cal GUestRegisterAPi with the guestUserId as a param
        console.log("flag is trueeee");
        const response = await fetch(
          "http://localhost:8000/account/guest-sign-up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(mergedData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("Signup successful", data);
          localStorage.setItem("token", data.accessToken); // Store token in localStorage
          setShowSubmissionMessage(true);
        } else {
          throw new Error(data.message || "Failed to process the request");
        }

        return;
      }

      const response = await fetch("http://localhost:8000/account/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
        localStorage.setItem("token", data.accessToken); // Store token in localStorage
        setShowSubmissionMessage(true);
      } else {
        throw new Error(data.message || "Failed to process the request");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const setError = (errorMessage: string) => {
    // Implement your error handling logic here
    console.error(errorMessage);
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/account/google";
  };

  return (
    <main className="w-full max-h-fit flex flex-col items-center justify-center px-4 pt-8 bg-dark-grey">
      <div className="max-w-2xl w-full text-gray-600 space-y-8 bg-gray-800 shadow-lg rounded-2xl p-8">
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
              Sign up for an account
            </h3>
            <p className="text-gray-400">
              Already have an account?{" "}
              <a
                href="/pages/authentication/login"
                className="font-medium text-teal-500 hover:text-teal-400"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="font-medium text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-white bg-gray-700 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="font-medium text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-white bg-gray-700 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-gray-700 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-gray-700 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
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
              className="w-full mt-2 px-3 py-2 text-white bg-gray-700 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-teal-500 hover:bg-teal-400 active:bg-teal-600 rounded-lg duration-150"
          >
            Sign up
          </button>
        </form>
        <div className="relative">
          <span className="block w-full h-px bg-gray-700"></span>
          <p className="inline-block w-fit text-sm bg-gray-800 px-2 absolute -top-2 inset-x-0 mx-auto text-gray-400">
            Or continue with
          </p>
        </div>
        <div className="space-y-4 text-sm font-medium">
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-700 rounded-lg hover:bg-gray-700 duration-150 active:bg-gray-600"
          >
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
        </div>
        <div className="text-center">
          <a
            href="/src/app/pages/authentication/resetPassword/page.tsx"
            className="text-teal-500 hover:text-teal-400"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}

function setError(errorMessage: string) {
  // Handle error display or logging
}
