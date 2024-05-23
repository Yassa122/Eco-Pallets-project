// components/modalTest.js

import React from 'react';
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <Card className="max-w-md w-full space-y-6 p-6 rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex flex-col items-center">
            <CircleCheckIcon className="text-green-500 h-16 w-16" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Payment Successful</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Thank you for your payment. Your order is being processed.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            {/* <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Amount Paid:</span>
              <span className="font-medium text-gray-900 dark:text-gray-50">$99.99</span>
            </div> */}
            {/* <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
              <span className="font-medium text-gray-900 dark:text-gray-50">Visa ending in 1234</span>
            </div> */}
            {/* <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Date & Time:</span>
              <span className="font-medium text-gray-900 dark:text-gray-50">April 18, 2024 at 3:45 PM</span>
            </div> */}
          </div>
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
              href="#" onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        </Card>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: transparent;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          position: relative;
        }
      `}</style>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
