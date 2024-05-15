import React, { useState } from 'react';

const FeaturedProducts = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRight = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const scrollLeft = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="featured-products-container">
      <div className="scroll-buttons">
        <button onClick={scrollLeft}>Scroll Left</button>
        <button onClick={scrollRight}>Scroll Right</button>
      </div>
      <div className="product-boxes">
        {items.map((item, index) => (
          <div key={index} className={`product-box ${index === currentIndex ? 'active' : ''}`}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
