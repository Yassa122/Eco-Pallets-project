'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import the Next.js Image component
import Pallet1 from '../../images/cart/pallet1.png'; // Ensure this path is correct

interface Product {
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  size: string;
  material: string;
  availability: boolean;
  rentalOptions: {
    available: boolean;
    duration?: number;
    price?: number;
  };
}

interface WishlistItem {
  _id: string;
  productId: Product;
  userId: string;
  createdAt: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchWishlist = async () => {
      const token = localStorage.getItem('accessToken');
      console.log('Token retrieved:', token); // Debugging log

      if (!token) {
        setError("Token not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/product/MyWishlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        console.log("res", response);

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Fetching error:', errorResponse);
          throw new Error(errorResponse.message || 'Failed to fetch wishlist');
        }

        const data = await response.json();
        console.log('Response data:', data); // Log the response data

        if (!Array.isArray(data) || data.length === 0) {
          setError('No items found in wishlist');
        } else {
          setWishlist(data);
        }
      } catch (err) {
        console.error('Fetching error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [router]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`http://localhost:8080/product/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ productId }), // Include productId in the request body
      });

      if (response.ok) {
        setWishlist(prev => prev.filter(item => item.productId._id !== productId));
        setShowDeleteMessage(true); // Show the delete message
        setTimeout(() => setShowDeleteMessage(false), 3000); // Hide the delete message after 3 seconds
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete product from wishlist');
      }
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wishlist.length) {
    return <div>No items in wishlist.</div>;
  }

  return (
    <Container className="mt-5">
      {showDeleteMessage && <Alert variant="success">Product deleted successfully!</Alert>}
      <Row>
        {wishlist.map((item) => (
          <Col md={3} key={item._id}>
            <Card className="mb-4 bg-dark text-white">
              <Image src={Pallet1} alt={item.productId.name} layout="responsive" width={300} height={300} />
              <Card.Body>
                <Card.Title>{item.productId.name}</Card.Title>
                <Card.Text>${item.productId.price}</Card.Text>
                <Button variant="danger" onClick={() => handleDeleteProduct(item.productId._id)}>Delete Product</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <style jsx>{`
        .wishlist-container {
          padding: 20px;
          max-width: 1200px; /* Increase the max width of the container */
          margin: 0 auto; /* Center the container */
          background-color: #1e1e1e; /* Dark background color */
        }
        .wishlist-header {
          color: #e0e0e0; /* Light text color */
          font-size: 2rem; /* Increase the font size */
          margin-bottom: 20px; /* Add space below the header */
        }
        .wishlist-list {
          list-style-type: none;
          padding: 0;
        }
        .wishlist-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 20px; /* Increase padding for a larger box */
          border: 1px solid #444; /* Dark border color */
          border-radius: 8px;
          justify-content: space-between;
          width: 100%; /* Make sure the item takes full width */
          background-color: #333; /* Darker background color */
        }
        .product-image {
          width: 150px; /* Increase width of the image container */
          height: 150px; /* Increase height of the image container */
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-details {
          flex-grow: 1;
          margin-left: 20px;
        }
        .product-details h2 {
          margin-bottom: 10px; /* Add space below the name */
        }
        .product-description {
          color: #ccc; /* Light grey description color */
          margin-bottom: 10px; /* Add space below the description */
        }
        .product-price {
          color: #38B2AC; /* Set the desired color for the price */
          margin: 0; /* Remove margin for better alignment */
          padding: 0; /* Remove padding for better alignment */
        }
        .add-to-cart {
          background: transparent;
          position: relative;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid #38B2AC; /* Change border color to #38B2AC */
          border-radius: 25px;
          outline: none;
          overflow: hidden;
          color: #38B2AC; /* Change text color to #38B2AC */
          transition: color 0.3s 0.1s ease-out;
          text-align: center;
          margin-left: -30px; /* Move the button a little bit to the left */
        }
        .add-to-cart span {
          margin: 10px;
        }
        .add-to-cart::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          content: '';
          border-radius: 50%;
          display: block;
          width: 20em;
          height: 20em;
          left: -5em;
          text-align: center;
          transition: box-shadow 0.5s ease-out;
          z-index: -1;
        }
        .add-to-cart:hover {
          color: #fff;
          border: 1px solid #38B2AC; /* Change hover border color to #38B2AC */
        }
        .add-to-cart:hover::before {
          box-shadow: inset 0 0 0 10em #38B2AC; /* Change hover shadow color to #38B2AC */
        }
        .add-to-cart:disabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
        }

        .meatballs-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 5px;
          font-size: 20px;
          color: #38B2AC;
          outline: none;
        }
        .wishlist-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #444; /* Dark border color */
          border-radius: 8px;
          justify-content: space-between;
          width: 100%;
          position: relative; /* Position relative for absolute positioning of meatballs button */
        }

        .wishlist-item-header {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .meatball-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #e0e0e0; /* Light text color */
        }

        .meatball-menu {
          position: absolute;
          top: 30px;
          right: 10px;
          background: #1e1e1e;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 5px;
          padding: 10px;
          z-index: 100;
        }

        .meatball-menu button {
          display: block;
          background: none;
          border: none;
          padding: 10px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          color: #e0e0e0; /* Light text color */
        }

        .meatball-menu button:hover {
          background: #2c2c2c;
        }
      `}</style>
    </Container>
  );
};

export default WishlistPage;
