'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Image from "next/image";
import Pallet1 from '../../../images/Pallet1.png';
import CustomizeProduct from './CustomizeProduct';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Product {
  _id:string,
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
  _id: string;
  user: string;
  rating: number;
  comment: string;
  userId: string;
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
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '' });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProductDetails();
    fetchProductReviews();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // Assuming you have a function to get the current user's ID from the token
    const userId = getCurrentUserIdFromToken(token);
    setCurrentUserId(userId);
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
      const response = await fetch(`http://localhost:8080/product/reviews/${_id}`);
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

  const handleCustomize = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleRent = () => setShowRentModal(true);
  const handleRentClose = () => setShowRentModal(false);
  const handleShare = () => setShowShareModal(true);
  const handleShareClose = () => setShowShareModal(false);

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/product/${_id}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
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

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const body = {
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price,
      };

      const response = await fetch("http://localhost:7001/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Added to cart");
      } else {
        console.log("Failed to add to cart");
      }
    } catch (error) {
      console.log("Failed to add to cart");
      console.error("Add to cart error:", error);
    }  };

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

  const handleReviewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewData((prevState) => ({
      ...prevState,
      rating,
    }));
  };

  const handleReviewSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not logged in
      sessionStorage.setItem('redirectUrl', window.location.href);
      router.push('/pages/authentication/login');
      return;
    }

    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/product/${_id}/addreview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, data]);
      setReviewData({ rating: 0, comment: '' });
    } catch (error) {
      console.error('Review submission error:', error);
      setError('Failed to submit review. Please try again later.');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not logged in
      sessionStorage.setItem('redirectUrl', window.location.href);
      router.push('/pages/authentication/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/product/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Delete review error:', error);
      setError('Failed to delete review. Please try again later.');
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
              <Button variant="custom custom-button" onClick={handleCustomize}>Customize</Button>
              <Button variant="outline-custom custom-button" onClick={handleAddToWishlist}>Add to Wishlist</Button>
              <Button variant="custom custom-button" onClick={handleRent}>Rent</Button>
              <Button variant="custom custom-button" onClick={handleAddToCart}>Add to Cart</Button>
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
            reviews.map((review) => (
              <Card key={review._id} className="mb-3 review-card">
                <Card.Body>
                  <Card.Title>{review.user}</Card.Title>
                  <Card.Text>Rating: {review.rating}/5</Card.Text>
                  <Card.Text>{review.comment}</Card.Text>
                  {currentUserId === review.userId && (
                    <Button variant="danger custom-button" onClick={() => handleDeleteReview(review._id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews for this product.</p>
          )}
        </Col>
      </Row>

      {isLoggedIn && (
        <div className="review-form mt-5">
          <h3>Add a Review</h3>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`star ${reviewData.rating >= star ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={reviewData.comment}
                onChange={handleReviewInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary custom-button">Submit Review</Button>
          </Form>
        </div>
      )}

      {!isLoggedIn && <p>Please log in to add a review.</p>}

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
            <Button variant="primary custom-button" onClick={handleRentSubmit}>
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
          <Button variant="primary custom-button" className="mb-2 w-100" onClick={() => handleShareTo('facebook')}>Share on Facebook</Button>
          <Button variant="success custom-button" className="mb-2 w-100" onClick={() => handleShareTo('whatsapp')}>Share on WhatsApp</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetails;

const getCurrentUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
