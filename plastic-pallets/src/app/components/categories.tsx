// components/CategoriesComponent.js
"use client"
import React from 'react';
import Image from 'next/image'; // Importing Image component from next/image
import metal from '../pics/metall Background Removed 2.png'; // Importing the product image
import plastic from '../pics/p4 Background Removed.png'; // Importing the product image
import drum from '../pics/p2 Background Removed.png';

const CategoriesComponent = () => {
  return (
    <div className="categories-container">
      <h2 className="categories-title">Discover Our Categories</h2>
      <div className="categories">
        <div className="category">
          <a href="http://localhost:3000/pages/plastic">
            <div className="category-inner">
              <div className="category-front">
                <Image src={plastic} alt="Plastic" width={300} height={200} />
              </div>
              <div className="category-back">
                <h3 className="category-back-title">Plastic</h3>
              </div>
            </div>
          </a>
        </div>
        <div className="category">
        <a href="http://localhost:3000/pages/categories">
            <div className="category-inner">
              <div className="category-front">
                <Image src={metal} alt="Metal" width={300} height={200} />
              </div>
              <div className="category-back">
                <h3 className="category-back-title">Metal</h3>
              </div>
            </div>
          </a>
        </div>
        <div className="category">
          <a href="http://localhost:3000/pages/drum">
            <div className="category-inner">
              <div className="category-front">
                <Image src={drum} alt="Drum Pallets" width={300} height={200} />
              </div>
              <div className="category-back">
                <h3 className="category-back-title">Drum Pallets</h3>
              </div>
            </div>
          </a>
        </div>
      </div>
      <style jsx>{`
        .categories-container {
          padding: 40px; /* Add some padding to the container */
          background-color: #000; /* Change background color to black */
          border-radius: 10px; /* Add rounded corners */
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
        }
        .categories {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 30px; /* Add gap between categories */
        }
        .category {
          width: 300px;
          height: 200px;
          perspective: 1000px;
        }
        .category-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .category:hover .category-inner {
          transform: rotateY(180deg);
        }
        .category-front,
        .category-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
        }
        .category-front {
          background-color: #000;
        }
        .category-back {
          background-color: #000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotateY(180deg);
        }
        .category-back-title {
          font-size: 24px;
          font-weight: bold;
        }
        .categories-title {
          color: #fff; /* White font color */
          font-size: 36px; /* Increase font size */
          text-align: center; /* Center align */
          margin-bottom: 40px; /* Add spacing */
        }
      `}</style>
    </div>
  );
};

export default CategoriesComponent;
