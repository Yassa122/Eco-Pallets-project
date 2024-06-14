"use client";

import { Suspense, SetStateAction, useState } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png"; // Update this with the correct path to your logo
import { useSearchParams } from "next/navigation";

const ResetPasswordPageComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPopupMessage("Passwords do not match. Please try again.");
      setShowPopup(true);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8000/account/password/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ newPassword: password, token }),
        }
      );

      const result = await response.json();
      setPopupMessage(result.message);
      setShowPopup(true);

      if (response.ok) {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setPopupMessage("Failed to update password. Please try again.");
      setShowPopup(true);
      console.error("Error updating password:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
              Reset your password
            </h3>
            <p className="text-white">
              Enter your new password to reset your account password
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium text-white">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full mt-2 px-3 py-2 text-white bg-gray-900 outline-none border border-gray-700 focus:border-teal-500 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark-grey p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p className="mb-4">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageComponent />
    </Suspense>
  );
};

export default ResetPasswordPage;
