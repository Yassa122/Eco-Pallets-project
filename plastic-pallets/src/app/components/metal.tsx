"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from "../pics/drum3 Background Removed.png";
import HeartIcon from "../pics/favs Background Removed.png";
import product2 from "../pics/durm2 Background Removed.png";
import product3 from "../pics/drum1 Background Removed.png";

interface Item {
  id: string;
  name: string;
  price: number;
  rating: string;
  image?: string;
}

const Drum = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5555/favorites/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: Item[] = await response.json();
      if (response.ok) {
        console.log("Items Fetched Successfully", data);
        const itemsWithRandomRating = data.map((item: Item) => ({
          ...item,
          rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        }));
        setItems(itemsWithRandomRating);
      } else {
        throw new Error( "Failed to fetch Items");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const addToFavorites = (item: Item) => {
    console.log("Added item to favorites:", item);
  };

  const addToCart = (item: Item) => {
    console.log("Added item to cart:", item);
  };

  const getRatingColor = (rating: string) => {
    const parsedRating = parseFloat(rating);
    if (parsedRating < 2.5) {
      return "red";
    } else if (parsedRating >= 2.5 && parsedRating < 3.5) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <section
      style={{
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        paddingTop: "70px",
        backgroundColor: "#000",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "2.5rem",
          letterSpacing: "2px",
          fontFamily: "Georgia, serif",
        }}
      >
        Discover Our Drum Collection
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
              }}
            >
              <Image
                src={item.image || product3}
                layout="responsive"
                width={300}
                height={300}
                objectFit="cover"
                alt={item.name}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 2,
                }}
              >
                <button onClick={() => addToFavorites(item)} className="btn">
                  <Image
                    src={HeartIcon}
                    alt="Add to Favorites"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  margin: "0",
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "10px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  margin: "0",
                  color: "#bbb",
                  fontSize: "1.4rem",
                  marginBottom: "10px",
                  fontFamily: "Georgia, serif",
                }}
              >
                Price:{" "}
                <span
                  style={{
                    fontSize: "1.6rem",
                    color: "#fff",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ${item.price}
                </span>
              </p>
              <p
                style={{
                  margin: "0",
                  color: "#bbb",
                  fontSize: "1.4rem",
                  marginBottom: "10px",
                  fontFamily: "Georgia, serif",
                }}
              >
                Rating:{" "}
                <span
                  style={{
                    fontSize: "1.6rem",
                    color: getRatingColor(item.rating),
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {item.rating}
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#00bcd4",
                    color: "cyan",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s",
                  }}
                >
                  Add to Cart
                </button>
                <div>
                  <button
                    onClick={() => addToFavorites(item)}
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      border: "none",
                      backgroundColor: "#00bcd4",
                      color: "cyan",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s",
                    }}
                  >
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

export default Drum;
