import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from '../pics/Unknowncs.jpeg'

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
    <section style={{ color: 'white' }}>
      <h2>Featured Products</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px', flex: '0 0 auto' }}>
              <Image src={product1} width={100} height={100} />
            </div>
            <div style={{ flex: '1 1 auto' }}>
              <h3 style={{ margin: '0', marginBottom: '5px' }}>{item.name}</h3>
              <p style={{ margin: '0', color: '#888' }}>Price: {item.price}</p>
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button onClick={() => addToCart(item.id)} style={{ marginRight: '10px', padding: '8px 12px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add to Cart</button>
              <button onClick={() => addToFavorites(item.id)} style={{ padding: '8px 12px', border: 'none', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add to Favorites</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedProducts;
