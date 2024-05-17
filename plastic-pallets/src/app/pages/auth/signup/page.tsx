/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FormEvent, useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    address: "",
  });
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/account/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
        setShowSubmissionMessage(true);
      } else {
        throw new Error(data.message || "Failed to process the request");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-gray-600 space-y-8 bg-dark-grey shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">
              Sign up for an account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}

function setError(errorMessage: string) {
  // Handle error display or logging
}
