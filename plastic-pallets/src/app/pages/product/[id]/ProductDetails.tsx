'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Changed from 'next/navigation' to 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Image from "next/image";
import Pallet1 from '../../../images/Pallet1.png';
import CustomizeProduct from './CustomizeProduct';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

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

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface ProductDetailsProps {
  _id: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ _id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rentalStart, setRentalStart] = useState<string>('');
  const [rentalEnd, setRentalEnd] = useState<string>('');
  const [deposit, setDeposit] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProductDetails();
    fetchProductReviews();
  }, [_id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/productdetails/${_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Product = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Fetching error:', error);
      setError('Failed to fetch product details. Please try again later.');
    }
  };

  const fetchProductReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${_id}/reviews`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Review[] = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Fetching error:', error);
      setError('Failed to fetch product reviews. Please try again later.');
    }
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRent = () => {
    setShowRentModal(true);
  };

  const handleRentClose = () => {
    setShowRentModal(false);
    setTotalPrice(null);
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${_id}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'yourUserId' }), // Replace 'yourUserId' with the actual user ID
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setWishlistMessage('Product added to wishlist!');
    } catch (error) {
      console.error('Wishlist error:', error);
      setWishlistMessage('Failed to add product to wishlist. Please try again later.');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleShareClose = () => {
    setShowShareModal(false);
  };

  const handleShareTo = (platform: string) => {
    let url = '';
    const productUrl = window.location.href;
    const productTitle = product?.name || '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(productTitle + ' ' + productUrl)}`;
        break;
      default:
        break;
    }

    window.open(url, '_blank');
    setShowShareModal(false);
  };

  const calculateTotalPrice = () => {
    if (!rentalStart || !rentalEnd || deposit <= 0) return;

    const start = new Date(rentalStart);
    const end = new Date(rentalEnd);
    const rentalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (rentalDays <= 0) {
      setTotalPrice(null);
      return;
    }

    setTotalPrice(rentalDays * deposit);
  };

  const handleRentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${_id}/rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentalStart, rentalEnd, deposit }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Rent details:', data);
      setShowRentModal(false);
      // Optionally redirect or update UI after successful rent
    } catch (error) {
      console.error('Rent error:', error);
      // Optionally show error message to the user
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [rentalStart, rentalEnd, deposit]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <Container className="product-container mt-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="bg-dark text-white">
            <Card.Img variant="top" src={Pallet1.src} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-meta">
              <p className="product-price">${product.price}</p>
              <p className="product-color">Color: {product.color}</p>
              <p className="product-size">Size: {product.size}</p>
              <p className="product-material">Material: {product.material}</p>
            </div>
            <div className="product-actions">
              <Button variant="custom" onClick={handleCustomize}>Customize</Button>
              <Button variant="outline-custom" onClick={handleAddToWishlist}>Add to Wishlist</Button>
              <Button variant="custom" onClick={handleRent}>Rent</Button>
              <FontAwesomeIcon icon={faShareAlt} className="share-icon" onClick={handleShare} />
            </div>
            {wishlistMessage && <p>{wishlistMessage}</p>}
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2 className="mb-4">Customer Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Card key={index} className="mb-3 review-card">
                <Card.Body>
                  <Card.Title>{review.user}</Card.Title>
                  <Card.Text>Rating: {review.rating}/5</Card.Text>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews for this product.</p>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customize Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomizeProduct _id={_id} onClose={handleClose} />
        </Modal.Body>
      </Modal>

      <Modal show={showRentModal} onHide={handleRentClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rent Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rental Start Date</Form.Label>
              <Form.Control
                type="date"
                value={rentalStart}
                onChange={(e) => setRentalStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rental End Date</Form.Label>
              <Form.Control
                type="date"
                value={rentalEnd}
                onChange={(e) => setRentalEnd(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
              />
            </Form.Group>
            {totalPrice !== null && (
              <p>Total Rental Price: ${totalPrice}</p>
            )}
            <Button variant="primary" onClick={handleRentSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showShareModal} onHide={handleShareClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-2 w-100" onClick={() => handleShareTo('facebook')}>Share on Facebook</Button>
          <Button variant="success" className="mb-2 w-100" onClick={() => handleShareTo('whatsapp')}>Share on WhatsApp</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
