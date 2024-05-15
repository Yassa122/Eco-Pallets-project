import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Pallet1 from '../../images/cart/pallet1.png';
import axios from 'axios';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, []);



  const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:7000/cartItems", {
          // Change to match your backend URL and endpoint
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This is needed to handle cookies if you're using them for authentication
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log("Cart Items Fetched Successfully", data);
          setCartItems(data);
          // Handle successful login here (e.g., redirect or store JWT)
        } else {
          throw new Error(data.message || "Failed to fetch Cart Items");
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };


  
    const removeItem = async (itemId) => {
      try {
        const response = await fetch(`http://localhost:7000/removeCartItem`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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
        const response = await fetch('http://localhost:7000/addQuantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
        const response = await fetch('http://localhost:7000/subtractQuantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{ color: 'white', width: '50%', float: 'left', marginLeft:'1vw'}} className='p-8'> {/* Set width to 50% and float to left */}
      {cartItems.map((item, index) => (
        <div key={item.productId} style={{ display: 'flex', alignItems: 'center', borderBottom: index !== cartItems.length - 1 ? '1px solid white' : 'none', padding: '3vh' }}>
          <Image src={Pallet1} alt={item.name} style={{ width: '12vw', height: '16vh', marginRight: '2vw' }} />
          <div>
            <p>{item.productName}</p>
            <p>Price: ${item.price}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Adjusted spacing */}
              <button onClick={() => decrementQuantity(item.productId)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span> {/* Adjusted spacing */}
              <button onClick={() => incrementQuantity(item.productId)}>+</button>
            </div>
            <p>Total Price: ${item.price * item.quantity}</p>
            <button onClick={() => removeItem(item.productId)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      <p>Subtotal: ${calculateTotal()}</p>
    </div>
  );
  
};

export default ShoppingCart;