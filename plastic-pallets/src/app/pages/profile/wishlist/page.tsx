// pages/my-wishlist.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import Pallet1 from '../../../images/cart/pallet1.png'; // Corrected path

interface Product {
  productId:string;
  name: string;
  description: string;
  price: number;
  images: string[];
  availability: boolean;
}

interface Wishlist {
  userId: string;
  products: Product[];
}

const MyWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMenus, setOpenMenus] = useState<boolean[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false); // State for showing the delete message

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:8080/product/my-wishlist', {
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
          setOpenMenus(data.products.map(() => false));
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

  const toggleMenu = (productId: string, index: number) => {
    setOpenMenus(prev => {
      const newOpenMenus = [...prev];
      newOpenMenus[index] = !newOpenMenus[index];
      return newOpenMenus;
    });
    setSelectedProductId(productId);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`http://localhost:8080/product/remove-from-wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ productId }), // Include productId in the request body
      });

      if (response.ok) {
        setWishlist(prev => {
          if (!prev) {
            return null;
          }
          return {
            ...prev,
            products: prev.products.filter(product => product.productId !== productId)
          };
        });
        setShowDeleteMessage(true); // Show the delete message
        setTimeout(() => setShowDeleteMessage(false), 3000); // Hide the delete message after 3 seconds
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete product from wishlist');
      }
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('auth_token');
      const body = {
        productId: product.productId,
        productName: product.name,
        quantity: 1,
        price: product.price,
        image: product.images[0], // Assuming the first image is the main image
        totalPrice: product.price, // Assuming total price is the same as price for now
      };
      console.log(body);
  
      const response = await fetch("http://localhost:7000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Item added to cart:", data);
        handleDeleteProduct(product.productId);
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
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
      {showDeleteMessage && <p className="delete-message">Product deleted from wishlist</p>}
      <ul className="wishlist-list">
        {wishlist.products.map((product, index) => (
          <li key={product.productId
          } className="wishlist-item">
            <div className="wishlist-item-header">
              <button
                className="meatball-button"
                onClick={() => toggleMenu(product.productId, index)}
              >
                ...
              </button>
              {openMenus[index] && (
                <div className="meatball-menu">
                  <button className="delete-button" onClick={() => handleDeleteProduct(product.productId
                  )}>Delete</button>
                </div>
              )}
            </div>
            <div className="product-image">
              <Image src={Pallet1} alt={product.name} />
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
            <button
              className="add-to-cart"
              onClick={() => addToCart(product.productId)}
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

        .meatballs-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 5px;
          font-size: 20px;
          color: #38B2AC;
          outline: none;
        }
        .wishlist-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          justify-content: space-between;
          width: 100%;
          position: relative; /* Position relative for absolute positioning of meatballs button */
        }

        .wishlist-item-header {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .meatball-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #e0e0e0; /* Light text color */
        }

        .meatball-menu {
          position: absolute;
          top: 30px;
          right: 10px;
          background: #1e1e1e;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 5px;
          padding: 10px;
          z-index: 100;
        }

        .meatball-menu button {
          display: block;
          background: none;
          border: none;
          padding: 10px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          color: #e0e0e0; /* Light text color */
        }

        .meatball-menu button:hover {
          background: #2c2c2c;
        }
      `}</style>
    </div>
  );
};

export default MyWishlist;
