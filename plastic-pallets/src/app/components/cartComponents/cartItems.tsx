import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Proceed from './proceed';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // State to hold the subtotal

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Recalculate subtotal whenever cartItems change
    calculateTotal();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch("http://localhost:7000/cartItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include Bearer token
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
      });
  
      const data = await response.json();
  
      // Check response status
      if (response.ok) {
        console.log("Cart Items Fetched Successfully", data);
        setCartItems(data);
      } else {
        throw new Error(data.message || "Failed to fetch Cart Items");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };
  

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch("http://localhost:7000/removeCartItem", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`, // Include Bearer token
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
        body: JSON.stringify({ prodId: itemId }), // Send the item ID in the request body
      });

      if (response.ok) {
        // If successful, update the cart items state
        const updatedItems = cartItems.filter(item => item.productId !== itemId);
        setCartItems(updatedItems);
      } else {
        const data = await response.json();
        console.error('Failed to remove item:', data.message);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const incrementQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:7000/addQuantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`, // Include Bearer token
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
        body: JSON.stringify({ prodId: itemId }), // Send the item ID in the request body
      });

      if (response.ok) {
        // If successful, update the cart items state
        const updatedItems = cartItems.map(item => {
          if (item.productId === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        const data = await response.json();
        console.error('Failed to increment quantity:', data.message);
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:7000/subtractQuantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`, // Include Bearer token
        },
        credentials: "include", // This is needed to handle cookies if you're using them for authentication
        body: JSON.stringify({ prodId: itemId }), // Send the item ID in the request body
      });

      if (response.ok) {
        // If successful, update the cart items state
        const updatedItems = cartItems.map(item => {
          if (item.productId === itemId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        const data = await response.json();
        console.error('Failed to decrement quantity:', data.message);
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const calculateTotal = () => {
    const subbtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(subbtotal);
  };

return (
  <div>
    <div style={{ color: '#7F92B3', width: '40%', float: 'left', marginLeft: '5vw' }} className='p-8'>
      {cartItems.map((item, index) => {
        const ProductImage = require(`../../images/cart/${item.productName.replace(/\s/g, '').toLowerCase()}.png`).default;
        return (
          <div key={item.productId} style={{ display: 'flex', alignItems: 'center', borderBottom: index !== cartItems.length - 1 ? '1px solid white' : 'none', padding: '3vh' }}>
            <Image src={ProductImage} alt={item.name} style={{ width: '12vw', height: '16vh', marginRight: '2vw' }}/>
            <div>
              <p>{item.productName}</p>
              <p>Price: ${item.price}</p>
              <div style={{ display: 'flex', alignItems: 'center', padding: "0.5vh" }}>
                <button onClick={() => decrementQuantity(item.productId)}>-</button>
                <span style={{ margin: '0 10px', fontSize: "0.8rem" }}>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item.productId)}>+</button>
              </div>
              <p>Total Price: ${item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.productId)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <Proceed subtotal={subtotal} />
  </div>
);

};

export default ShoppingCart;
