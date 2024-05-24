"use client";

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  date: string;
  totalPrice: number;
  status: string;
  cartItems: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            throw new Error('No access token found');
          }
      
          const response = await fetch('http://localhost:7000/orderhistory', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          });
      
          const data = await response.json();
          if (response.ok) {
            console.log('Fetched order history:', data);
            setOrders(data);
          } else {
            throw new Error(data.message || 'Failed to fetch order history');
          }
        } catch (error) {
          console.error('Fetching error:', error);
        } finally {
          setLoading(false);
        }
      };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orders.length) {
    return <p>No order history found.</p>;
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-header">Order History</h1>
      <ul className="wishlist-list">
        {orders.map((order) => (
          <li key={order._id} className="wishlist-item">
            <div className="wishlist-order-details">
              <div>Order Number: {order._id}</div>
              <div>Date: {new Date(order.date).toLocaleDateString()}</div>
              <div>Total Amount: {order.totalPrice}</div>
              <div>Status: {order.status}</div>
            </div>
            <ul className="wishlist-cart-items">
              {order.cartItems.map((item) => (
                <li key={item.productId} className="wishlist-cart-item">
                  {item.productName} - Quantity: {item.quantity} - Price: {item.price}
                </li>
              ))}
            </ul>
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
        .wishlist-order-details {
          flex-grow: 1;
          margin-left: 20px;
        }
        .wishlist-cart-items {
          list-style-type: none;
          padding: 0;
        }
        .wishlist-cart-item {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default OrderHistoryPage;
