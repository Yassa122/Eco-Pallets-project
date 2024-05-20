/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "src/app/images/Logo/png/logo-white.png";
import { FaTrashAlt } from "react-icons/fa"; // Import trash icon

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null;
};

const userId = getUserIdFromToken();

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      try {
        const response = await fetch(`/wishlist/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setItems(data);
        } else {
          console.error("Failed to fetch items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchItems();
  }, [userId]);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch('/wishlist/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, itemId }),
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId));
      } else {
        const data = await response.json();
        console.error("Failed to delete item:", data.message);
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Image src={logo} alt="Logo" width={150} height={50} />
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>My Wishlist</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ background: '#f4f4f4', marginBottom: '10px', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {item.name}
            <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red', fontSize: '1.2rem' }}>
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
