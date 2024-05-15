const WelcomeHome = () => {
  return (
    <div className="welcome-home" style={{ color: 'white', paddingTop: '200px' }}>
      <div className="authorized"><span style={{ color: "cyan" }}>100%</span> Authorized</div>
      <div className="slogan" style={{ padding: '25px' }}>YOUR BEST PLASTIC PALLET MADE WORLD-WIDE</div>
      <div className="since" style={{ fontSize: '10px' }}>Since 1991</div>
      <div className="subscribe">
        <input 
          type="email" 
          placeholder="Your Email" 
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
            fontSize: '16px', 
            outline: 'none',
            width: '250px', 
            marginRight: '10px' 
          }} 
        />
        <button style={{ backgroundColor: 'cyan', border: '2px solid cyan', borderRadius: '5px', color: 'white' }}>Subscribe</button>
      </div>
    </div>
  );
};

export default WelcomeHome;
