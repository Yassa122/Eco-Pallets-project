import React, { useEffect, useState } from 'react';

const Proceed = ({ subtotal }) => {
  const [enteredPromoCode, setEnteredPromoCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeMultiplier, setPromoCodeMultiplier] = useState(1);
  const [discountedTotal, setDiscountedTotal] = useState(subtotal);
  const [promoCodeStatus, setPromoCodeStatus] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('');


  useEffect(() => {
    const discountedPrice = subtotal * promoCodeMultiplier;
    setDiscountedTotal(discountedPrice);
  }, [promoCodeMultiplier, subtotal]);
  
  const handleApplyPromoCode = async () => {
    try {
      const response = await fetch('http://localhost:7000/applyPromoCode', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ promoCode: enteredPromoCode }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setPromoCode(enteredPromoCode);
        setPromoCodeMultiplier(1 - (data.discount.discountInPercent / 100));
        setDiscountedTotal(subtotal * promoCodeMultiplier);
        setPromoCodeStatus('Valid Promo Code');
        } else {
        setEnteredPromoCode('');
        setPromoCode('');
        setPromoCodeMultiplier(1);
        setDiscountedTotal(subtotal);
        setPromoCodeStatus('Invalid Promo Code');
        const data = await response.json();
        console.error('Failed to apply promo code:', data.message);
      }
    } catch (error) {
      console.error('Error applying promo code:', error);
    }
  };

  const removePromoCode = async () => {
    try {
      const response = await fetch('http://localhost:7000/resetPromoCode', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setPromoCode('');
        setPromoCodeMultiplier(1);
        setDiscountedTotal(subtotal);
        setPromoCodeStatus('');
      } else {
        const data = await response.json();
        console.error('Failed to remove promo code:', data.message);
      }
    } catch (error) {
      console.error('Error removing promo code:', error);
    }
  };

  const proceedToCheckout = async () => {
    console.log('Proceeding to checkout');
    try {
      const response = await fetch('http://localhost:7000/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.url);
        window.location.href = data.url; // Redirect to the provided URL
      } else {
        const data = await response.json();
        console.error('Failed to proceed to checkout:', data.message);
        // Display failure message to the user
        // For example, set a state to display a message to the user
        setCheckoutStatus('Failed to proceed to checkout. Please try again.');
      }
    } catch (error) {
      console.error('Failed to proceed to checkout:', error);
      // Display failure message to the user
      // For example, set a state to display a message to the user
      setCheckoutStatus('Failed to proceed to checkout. Please try again.');
    }
  };
  

  return (
    <div style={{ color: '#7F92B3', width: '49%',float: 'right', paddingTop: '4%' }} className='p-3'>
      <p className='p-3'>Subtotal: ${subtotal}</p>
      <div style={{ marginBottom: '10px' }} className='p-3'>
        <input type="text" placeholder="Enter Promo Code" value={enteredPromoCode} onChange={(e) => setEnteredPromoCode(e.target.value)} style={{ backgroundColor: 'white', color: 'black', borderRadius:'2vh' }} className='p-3' />
        <button style={{ backgroundColor: '#38B2AC', marginLeft: '10px', color: 'black', borderRadius:'2vh' }} onClick={handleApplyPromoCode} className='p-3'>Apply</button>
      </div>
      <p style={{ color: promoCodeStatus === 'Invalid Promo Code' ? 'red' : '#38B2AC' }} className='p-3'>{promoCodeStatus}</p>
      <p className='p-3' style = {{paddingBottom:'8%'}}>Total after discount: ${discountedTotal}</p>
      <button style={{ backgroundColor: '#38B2AC', color: 'black', borderRadius:'2vh' }} onClick={proceedToCheckout} className='p-3'>Proceed to Checkout</button>
      {promoCode && (
        <button style={{ backgroundColor: 'red', color: 'black' , marginLeft: '10px', borderRadius:'2vh'}} onClick={removePromoCode} className='p-3'>Remove Promo Code</button>
      )}
      {checkoutStatus && <p style={{ color: 'red' }}>{checkoutStatus}</p>}
    </div>
  );
};

export default Proceed;
