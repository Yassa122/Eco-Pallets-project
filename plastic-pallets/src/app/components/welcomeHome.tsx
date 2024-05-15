const WelcomeHome = () => {
  return (
    <div className="welcome-home" style={{ color: 'white', paddingTop: '100px', textAlign: 'center' }}>
      <div className="logo" style={{ marginBottom: '20px' }}>
      </div>
      <div className="slogan" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px' }}>
        Welcome to Our World of Quality Plastic Pallets
      </div>
      <div className="authorized" style={{ fontSize: '20px', marginBottom: '20px' }}>
        <span style={{ color: "cyan", fontWeight: 'bold' }}>100%</span> Authorized
      </div>
      <div className="subscribe" style={{ marginBottom: '50px' }}>
        <input 
          type="email" 
          placeholder="Enter your email for updates" 
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
            fontSize: '16px', 
            outline: 'none',
            width: '300px', 
            marginRight: '10px' 
          }} 
        />
        <button style={{ backgroundColor: 'cyan', border: '2px solid cyan', borderRadius: '5px', color: 'white', padding: '10px 20px', fontSize: '16px' }}>Subscribe</button>
      </div>
      <div className="since" style={{ fontSize: '14px' }}>Serving Since <span style={{ color: "cyan", fontWeight: 'bold', fontSize: '24px' }}>1911</span></div>
    </div>
  );
};

export default WelcomeHome;
