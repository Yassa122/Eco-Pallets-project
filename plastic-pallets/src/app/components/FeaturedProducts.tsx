"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from '../pics/p4 Background Removed.png'; // Update with actual item images if available
import cart from '../pics/cacart Background Removed.png';
import heart from '../pics/favs Background Removed.png';

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
        const itemsWithRandomRating = data.map(item => ({
          ...item,
          rating: (Math.random() * (5 - 1) + 1).toFixed(1)
        }));
        setItems(itemsWithRandomRating);
        console.log("Items Fetched Successfully", itemsWithRandomRating);
      } else {
        throw new Error(data.message || "Failed to fetch Items");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('auth_token');
      const body = {
        productId: item.productId, // Ensure this matches your item structure
        productName: item.name,
        quantity: 1,
        price: item.price,
        image: item.image
      };
      console.log(body);

      const response = await fetch("http://localhost:7001/addToCart", {
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
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const addToFavorites = async (item) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch("http://localhost:5555/addToFavorites", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ item }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Item added to favorites:", data);
      } else {
        throw new Error(data.message || "Failed to add item to favorites");
      }
    } catch (error) {
      console.error("Add to favorites error:", error);
    }
  };

  const getRatingColor = (rating) => {
    const parsedRating = parseFloat(rating);
    if (parsedRating < 2.5) {
      return 'red';
    } else if (parsedRating >= 2.5 && parsedRating < 3.5) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <section style={{ color: '#fff', fontFamily: 'Arial, sans-serif', padding: '20px', paddingTop: '70px', backgroundColor: '#000' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
        Discover Our Plastic Collection
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
              <Image src={product1} layout="responsive" width={300} height={300} objectFit="cover" alt={item.name} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                <button onClick={() => addToFavorites(item)} className="btn">
                  <Image src={heart} alt="Add to Favorites" width={30} height={30} />
                </button>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0', fontSize: '1.8rem', fontWeight: '600', color: '#fff', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>
                {item.name}
              </h3>
              <p style={{ margin: '0', color: '#bbb', fontSize: '1.4rem', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>
                Price: <span style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'Georgia, serif' }}>${item.price}</span>
              </p>
              <p style={{ margin: '0', color: '#bbb', fontSize: '1.4rem', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>
                Rating: <span style={{ fontSize: '1.6rem', color: getRatingColor(item.rating), fontFamily: 'Georgia, serif' }}>{item.rating}</span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => addToCart(item)} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
                  Add to Cart
                </button>
                <div>
                  <button onClick={() => addToFavorites(item)} className="btn" style={{ padding: '10px 20px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
