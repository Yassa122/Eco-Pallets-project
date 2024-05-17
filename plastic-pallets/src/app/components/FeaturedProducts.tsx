"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from '../pics/p4 Background Removed.png';
import cart from '../pics/cacart Background Removed.png';
import heart from '../pics/heart .png';

const FeaturedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5555/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Items Fetched Successfully", data);
        setItems(data);
      } else {
        throw new Error(data.message || "Failed to fetch Items");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const response = await fetch("http://localhost:7000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Item added to cart:", data);
        // You might want to update the UI here, like showing a message
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const addToFavorites = async (itemId) => {
    try {
      const response = await fetch("http://localhost:5555/addToFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Item added to favorites:", data);
        // You might want to update the UI here, like showing a message
      } else {
        throw new Error(data.message || "Failed to add item to favorites");
      }
    } catch (error) {
      console.error("Add to favorites error:", error);
    }
  };

  return (
    <section style={{ color: '#fff', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ flex: '1 1 300px', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#111111', color: '#fff', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <div style={{ width: '150px', height: '150px', margin: '0 auto 20px', position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
              <Image src={product1} layout="fill" objectFit="cover" />
            </div>
            <div style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', fontWeight: '600', color: '#fff' }}>{item.name}</h3>
              <p style={{ margin: '0', color: '#bbb', fontSize: '1.2rem' }}>Price: ${item.price}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => addToCart(item.id)} style={{ padding: '5px 10px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>
                + to Cart
              </button>
              <button onClick={() => addToFavorites(item.id)} style={{ padding: '5px 10px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>
                + to Favorites
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700" style={{ padding: '5px 10px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                </svg>
                Button
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
