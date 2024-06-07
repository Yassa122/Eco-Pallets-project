import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 text-white p-10 items-center">
      <div className="container  px-4 ">
        <div className="flex flex-wrap ">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
            <h3 className="text-lg font-bold mb-2">Logo</h3>
            <p className="text-gray-400">
              A brief description about the company or website.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
            <h3 className="text-lg font-bold mb-2">Company</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
            <h3 className="text-lg font-bold mb-2">Support</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
            <h3 className="text-lg font-bold mb-2">Legal</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
