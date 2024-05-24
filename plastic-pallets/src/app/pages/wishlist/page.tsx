// pages/my-wishlist.tsx
"use client";

import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Image from 'next/image'; // Import the Image component from Next.js
import Pallet1 from '../../pics/p4 Background Removed.png'; // Corrected path

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
        /* CSS styles remain unchanged */
      `}</style>
    </div>
  );
};

export default MyWishlist;
