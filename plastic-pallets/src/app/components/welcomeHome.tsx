import React, { useState } from 'react';

const WelcomeHome = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  return (
    <div className="welcome-home" style={{ color: 'white', paddingTop: '100px', textAlign: 'center' }}>
      <div className="logo" style={{ marginBottom: '20px' }}>
      </div>
      <div className="slogan" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px' }}>
        Welcome to Our World of Quality  Pallets
      </div>
      <div className="authorized" style={{ fontSize: '20px', marginBottom: '20px' }}>
        <span style={{ color: "#38b2ac", fontWeight: 'bold' }}>100%</span> Authorized
      </div>
      <div className="subscribe" style={{ marginBottom: '50px' }}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for updates" 
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
            fontSize: '16px', 
            outline: 'none',
            width: '300px', 
            marginRight: '10px',
            color: '#38b2ac' // Changed font color to #38b2ac
          }} 
        />
        <button 
          onClick={handleSubscribe}
          style={{ 
            backgroundColor: '#38b2ac', // Changed background color to #38b2ac
            border: '2px solid #38b2ac', // Changed border color to #38b2ac
            borderRadius: '5px', 
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '16px' 
          }}>
          Subscribe
        </button>
      </div>
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '15%', // Adjusted to move up a bit
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px', // Added padding
          borderRadius: '10px',
          zIndex: 1000,
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          animation: 'fadeInOut 3s forwards'
        }}>
          Email saved successfully!
        </div>
      )}
      <div className="since" style={{ fontSize: '14px' }}>Serving Since <span style={{ color: "#38b2ac", fontWeight: 'bold', fontSize: '24px' }}>1911</span></div>
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          10%, 90% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeHome;
