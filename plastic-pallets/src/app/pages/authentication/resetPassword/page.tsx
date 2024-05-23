/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png";
export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMail(email);
    // Your form submission logic here
  };

  const sendMail = async (email:string) => {
    try{
    await fetch("http://localhost:8888/email/reset-password-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

  }catch (error) {
      throw new Error("Failed to send mail "+error);
    }
    
  };
  
  

  return (<main className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-8 bg-dark-grey">
  <div className="max-w-md w-full text-gray-600 space-y-8 bg-gray-800 shadow-lg rounded-2xl p-8">
    <div className="text-center">
      <Image src={logo} alt="Logo" width={150} height={50} className="mx-auto mb-4 rounded-lg" />
      <div className="mt-5 space-y-2">
        <h3 className="text-white text-2xl font-bold sm:text-3xl">
          Reset your password
        </h3>
        <p className="text-white">
          Enter your email address below to receive password reset instructions.
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
      </div>
      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 text-white font-medium bg-teal-500 hover:bg-teal-400 active:bg-teal-600 rounded-lg duration-150"
      >
        Reset Password
      </button>
    </form>
    <div className="text-center">
      <a
        href="/pages/authentication/login"
        className="text-teal-500 hover:text-teal-400"
      >
        Remember your password? Login
      </a>
    </div>
  </div>
</main>
  );
}
