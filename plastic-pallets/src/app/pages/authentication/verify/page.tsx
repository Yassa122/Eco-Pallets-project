"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("") as [string, React.Dispatch<React.SetStateAction<string>>];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/account/profile/updateByMail",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, "isEmailVerified": true }), // Include isEmailVerified field
        }
      );

      // Redirect to another page after successfully sending the verification email
      // router.push("/verification-success");
    } catch (error) {
      console.error("Error verifying user:", error.message);
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
              Verify your email
            </h3>
            <p className="text-white">
              Enter your email address below to verify
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-gray-900 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
            />
            {typeof error === 'string' && <p className="text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-teal-500 hover:bg-teal-400 active:bg-teal-600 rounded-lg duration-150"
          >
            verify
          </button>
        </form>
      </div>
    </main>
  );
}
