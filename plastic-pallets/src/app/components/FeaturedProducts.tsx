import React, { useEffect, useState } from "react";
import Image from "next/image";
import cart from "../public/pics/cacart Background Removed.png";
import heart from "../pics/favs Background Removed.png";

interface Item {
  id: string;
  name: string;
  price: number;
  rating: string;
  productId: string;
  image: string;
}

const FeaturedProducts = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

      if (response.ok) {
        const data: Item[] = await response.json();
        const itemsWithRandomRating = data.map((item) => ({
          ...item,
          rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        }));
        setItems(itemsWithRandomRating);
        console.log("Items Fetched Successfully", itemsWithRandomRating);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch Items");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const addToCart = async (item: Item) => {
    try {
      const token = localStorage.getItem("auth_token");
      const body = {
        productId: item.productId,
        productName: item.name,
        quantity: 1,
        price: item.price,
        image: item.image,
      };

      const response = await fetch("http://localhost:7000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        showPopupMessage("Added to cart");
      } else {
        showPopupMessage("Failed to add to cart");
      }
    } catch (error) {
      showPopupMessage("Failed to add to cart");
      console.error("Add to cart error:", error);
    }
  };

  const addToFavorites = async (item: Item) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:5555/addToFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        showPopupMessage("Added to favorites");
      } else {
        showPopupMessage("Item already exists in favorites");
      }
    } catch (error) {
      showPopupMessage("Failed to add to favorites");
      console.error("Add to favorites error:", error);
    }
  };

  const addToWishlist = async (item: Item) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:8080/addToFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        showPopupMessage("Added to wishlist");
      } else {
        showPopupMessage("Item already exists in wishlist");
      }
    } catch (error) {
      showPopupMessage("Failed to add to wishlist");
      console.error("Add to wishlist error:", error);
    }
  };

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
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
        Discover Our Featured Collection
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
                src={`/${item.image}`}
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
                    src={heart}
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
                    backgroundColor: "#38b2ac",
                    color: "#fff", // Changed text color to white
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
                      backgroundColor: "#38b2ac",
                      color: "#fff", // Changed text color to white
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

      {showPopup && (
        <div
          className="popup"
          style={{
            display: showPopup ? "block" : "none",
            position: "fixed",
            left: "50%",
            top: "20%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          {popupMessage}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
