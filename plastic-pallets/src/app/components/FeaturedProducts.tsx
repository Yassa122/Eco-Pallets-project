import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import product1 from '../../images/product1.jpg';
import heart from '../../images/heart.svg';

const FeaturedProducts: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addToCart = async (item: any) => {
    // Handle add to cart logic
    showPopupMessage(`${item.name} added to cart!`);
  };

  const addToFavorites = async (item: any) => {
    // Handle add to favorites logic
    showPopupMessage(`${item.name} added to favorites!`);
  };

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide the popup after 2 seconds
  };

  const getRatingColor = (rating: string) => {
    const parsedRating = parseFloat(rating);
    if (parsedRating < 2.5) {
      return 'red';
    } else if (parsedRating >= 2.5 && parsedRating < 3.5) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <section style={{ color: '#fff', fontFamily: 'Arial, sans-serif', padding: '20px', paddingTop: '70px', backgroundColor: '#000' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
        Discover Our Featured Collection
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map((item) => (
          <div 
            key={item.id} 
            style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            onClick={() => handleProductClick(item.id)} 
          >
            <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
              <Image src={product1} layout="responsive" width={300} height={300} objectFit="cover" alt={item.name} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                <button onClick={(e) => {e.stopPropagation(); addToFavorites(item);}} className="btn">
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
                <button onClick={(e) => {e.stopPropagation(); addToCart(item);}} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
                  Add to Cart
                </button>
                <div>
                  <button onClick={(e) => {e.stopPropagation(); addToFavorites(item);}} className="btn" style={{ padding: '10px 20px', border: 'none', backgroundColor: '#00bcd4', color: 'cyan', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup" style={{
          display: showPopup ? 'block' : 'none',
          position: 'fixed',
          left: '50%',
          top: '20%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #ccc',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}>
          {popupMessage}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
