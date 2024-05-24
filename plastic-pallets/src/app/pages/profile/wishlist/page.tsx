// pages/my-wishlist.tsx
"use client";

import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Image from 'next/image'; // Import the Image component from Next.js
import Pallet1 from '../../../images/cart/pallet1.png'; // Corrected path

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  availability: boolean;
}

interface Wishlist {
  userId: string;
  cartId: string;
  products: Product[];
}

interface DecodedToken {
  userId: string;
  // Add other fields if necessary
}

const MyWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:8000/wishlist/my-wishlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Fetched wishlist:', data); // Debug log
          setWishlist(data);
        } else {
          throw new Error(data.message || 'Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`http://localhost:8000/wishlist-to-cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        const data = await response.json();
        alert(`Failed to add product to cart: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wishlist || !wishlist.products) {
    return <p>No wishlist found.</p>;
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-header">My Wishlist</h1>
      <ul className="wishlist-list">
        {wishlist.products.map((product) => (
          <li key={product._id} className="wishlist-item">
            <div className="product-image">
              <Image src={Pallet1} alt={product.name} /> {/* Use Image component from Next.js and Pallet1 image */}
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product._id)}
              disabled={!product.availability}
            >
              {product.availability ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .wishlist-container {
          padding: 20px;
          max-width: 1200px; /* Increase the max width of the container */
          margin: 0 auto; /* Center the container */
        }
        .wishlist-header {
          color: grey; /* Set the text color to grey */
          font-size: 2rem; /* Increase the font size */
          margin-bottom: 20px; /* Add space below the header */
        }
        .wishlist-list {
          list-style-type: none;
          padding: 0;
        }
        .wishlist-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 20px; /* Increase padding for a larger box */
          border: 1px solid #ccc;
          border-radius: 8px;
          justify-content: space-between;
          width: 100%; /* Make sure the item takes full width */
        }
        .product-image {
          width: 150px; /* Increase width of the image container */
          height: 150px; /* Increase height of the image container */
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-details {
          flex-grow: 1;
          margin-left: 20px;
        }
        .product-details h2 {
          margin-bottom: 10px; /* Add space below the name */
        }
        .product-description {
          color: grey; /* Set the description color to grey */
          margin-bottom: 10px; /* Add space below the description */
        }
        .product-price {
          color: #38B2AC; /* Set the desired color for the price */
          margin: 0; /* Remove margin for better alignment */
          padding: 0; /* Remove padding for better alignment */
        }
        .add-to-cart {
          background: transparent;
          position: relative;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid #38B2AC; /* Change border color to #38B2AC */
          border-radius: 25px;
          outline: none;
          overflow: hidden;
          color: #38B2AC; /* Change text color to #38B2AC */
          transition: color 0.3s 0.1s ease-out;
          text-align: center;
          margin-left: -30px; /* Move the button a little bit to the left */
        }
        .add-to-cart span {
          margin: 10px;
        }
        .add-to-cart::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          content: '';
          border-radius: 50%;
          display: block;
          width: 20em;
          height: 20em;
          left: -5em;
          text-align: center;
          transition: box-shadow 0.5s ease-out;
          z-index: -1;
        }
        .add-to-cart:hover {
          color: #fff;
          border: 1px solid #38B2AC; /* Change hover border color to #38B2AC */
        }
        .add-to-cart:hover::before {
          box-shadow: inset 0 0 0 10em #38B2AC; /* Change hover shadow color to #38B2AC */
        }
        .add-to-cart:disabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default MyWishlist;
