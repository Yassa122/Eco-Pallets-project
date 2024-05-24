// pages/favorites/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  availability: boolean;
}

interface Favorites {
  userId: string;
  favoritesId: string;
  products: Product[];
}

const MyFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorites | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:5555/items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Fetched favorites:', data); // Debug log
          setFavorites(data);
        } else {
          throw new Error(data.message || 'Failed to fetch favorites');
        }
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (productId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`http://localhost:8000/favorites/remove/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert('Product removed from favorites!');
        // You can also update the state to remove the product from the list
      } else {
        const data = await response.json();
        alert(`Failed to remove product from favorites: ${data.message}`);
      }
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!favorites || !favorites.products) {
    return <p>No favorites found.</p>;
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-header">My Favorites</h1>
      <ul className="favorites-list">
        {favorites.products.map((product) => (
          <li key={product._id} className="favorites-item">
            <div className="product-image">
              <Image src={product.images[0]} alt={product.name} /> {/* Use the first image from the product's images array */}
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
            <button
              className="remove-from-favorites"
              onClick={() => handleRemoveFromFavorites(product._id)}
            >
              Remove from Favorites
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

export default MyFavorites;
