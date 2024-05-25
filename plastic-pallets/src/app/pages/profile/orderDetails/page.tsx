"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pallet1 from '../../../images/cart/pallet1.png'; // Correct the path as needed

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

const ViewCartItemsPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:7000/viewCartItems', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setCartItems(data);
          calculateTotalPrice(data);
        } else {
          throw new Error(data.message || 'Failed to fetch cart items');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Order details</h1>
      {cartItems.length === 0 ? (
        <p>No cart items found.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.productId} className="border p-4 rounded mb-4 flex justify-between">
              <div className="flex">
                <div className="product-image mr-4">
                  <Image src={Pallet1} alt={item.productName} width={150} height={150} />
                </div>
                <div className="product-details">
                  <h2 className="text-xl font-bold text-38B2AC">{item.productName}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Total Price: ${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="total-price-container flex justify-end">
            <p className="text-xl font-bold text-38B2AC">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          color: white; /* Ensure text is visible on dark background */
        }
        .product-image {
          width: 150px;
          height: 150px;
        }
        .product-details {
          flex-grow: 1;
        }
        .total-price-container {
          margin-top: 20px; /* Add margin to separate from the last cart item */
        }
        .text-38B2AC {
          color: #38B2AC; /* Set the text color to #38B2AC */
        }
      `}</style>
    </div>
  );
};

export default ViewCartItemsPage;