"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import product1 from '../pics/metal1 Background Removed.png';
import HeartIcon from '../pics/favs Background Removed.png';

const Offers = () => {
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
                // Randomize rating for each item
                const itemsWithRandomRating = data.map(item => ({
                    ...item,
                    rating: (Math.random() * (5 - 1) + 1).toFixed(1),
                    oldPrice: (item.price * 1.2).toFixed(2), // Assuming the old price is 20% higher than the current price
                    discount: '20%', // Assuming a flat 20% discount for demonstration
                    validityPeriod: '31/12/2024' // Example validity period
                }));
                setItems(itemsWithRandomRating);
            } else {
                throw new Error(data.message || "Failed to fetch Items");
            }
        } catch (error) {
            console.error("Fetching error:", error);
        }
    };

    const addToFavorites = (item) => {
        // Implement addToFavorites functionality
        console.log("Added item to favorites:", item);
    };

    const addToCart = (item) => {
        // Implement addToCart functionality
        console.log("Added item to cart:", item);
    };

    // Function to determine rating color based on rating value
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
            <h2 className="slogan" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Discover Our Offers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {items.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
                            <Image src={product1} layout="responsive" width={300} height={300} objectFit="cover" alt={item.name} />
                            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                                <button onClick={() => addToFavorites(item)} className="btn">
                                    <Image src={HeartIcon} alt="Add to Favorites" width={30} height={30} />
                                </button>
                            </div>
                            <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#00bcd4', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                                {item.discount} OFF
                            </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ margin: '0', fontSize: '1.8rem', fontWeight: '600', color: '#fff', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>{item.name}</h3>
                            <p style={{ margin: '0', color: '#bbb', fontSize: '1.4rem', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>
                                Price: <span style={{ fontSize: '1.6rem', color: '#fff', textDecoration: 'line-through', fontFamily: 'Georgia, serif' }}>${item.oldPrice}</span> <span style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'Georgia, serif' }}>${item.price}</span>
                            </p>
                            <p style={{ margin: '0', color: '#bbb', fontSize: '1.4rem', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Rating: <span style={{ fontSize: '1.6rem', color: getRatingColor(item.rating), fontFamily: 'Georgia, serif' }}>{item.rating}</span></p>
                            <p style={{ margin: '0', color: '#bbb', fontSize: '1.4rem', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Valid until: <span style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'Georgia, serif' }}>{item.validityPeriod}</span></p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button onClick={() => addToCart(item.id)} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
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

export default Offers;
