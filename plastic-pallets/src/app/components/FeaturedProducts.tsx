import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from '../pics/Unknowncs.jpeg'


const FeaturedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5555/items", {
        // Adjust the URL to match your endpoint
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

  return (
    <section style={{ color: 'white' }}>
      <h2>Featured Products</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {/* Display item details here */}
            <Image src={product1} />
            <span style={{ color: 'white' }}>{item.name}</span>
            <span style={{ color: 'white' }}>{item.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedProducts;
