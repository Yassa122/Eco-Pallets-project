"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Pallet1 from '../../../images/cart/pallet1.png';  // Corrected path

// Define the type for the review data
interface UserReviewsDto {
  reviewId: string; // Include reviewId here
  productId: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the type for updating the review
interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

// RatingStars component to display star ratings
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating-stars">
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
      <style jsx>{`
        .rating-stars {
          color: gold;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};

// StarRatingInput component for updating star ratings
const StarRatingInput: React.FC<{ rating: number, onChange: (rating: number) => void }> = ({ rating, onChange }) => {
  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <div className="star-rating-input">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'grey' }}
        >
          {index < rating ? '★' : '☆'}
        </span>
      ))}
      <style jsx>{`
        .star-rating-input {
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
};

const UserReviews = () => {
  const [reviews, setReviews] = useState<UserReviewsDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<boolean[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<{ reviewId: string, data: UpdateReviewDto } | null>(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:8000/reviews/user-reviews', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setReviews(data);
          setShowMenu(new Array(data.length).fill(false));
        } else {
          throw new Error(data.message || 'Failed to fetch user reviews');
        }
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  const toggleMenu = (index: number) => {
    setShowMenu(prev => {
      const newShowMenu = [...prev];
      newShowMenu[index] = !newShowMenu[index];
      return newShowMenu;
    });
  };

  const handleEditReview = (reviewId: string, review: UserReviewsDto) => {
    setSelectedReview({ reviewId, data: { rating: review.rating, comment: review.comment } });
    setShowModal(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/reviews/delete-review/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        setReviews(prev => prev.filter(review => review.reviewId !== reviewId)); // Use reviewId here
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedReview(prev => prev ? { ...prev, data: { ...prev.data, [name]: value } } : null);
  };

  const handleStarChange = (rating: number) => {
    setSelectedReview(prev => prev ? { ...prev, data: { ...prev.data, rating } } : null);
  };

  const handleSaveReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedReview) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/reviews/update-review/${selectedReview.reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(selectedReview.data),
      });

      const data = await response.json();
      if (response.ok) {
        setReviews(prev =>
          prev.map(review => (review.reviewId === selectedReview.reviewId ? { ...review, ...selectedReview.data } : review)) // Use reviewId here
        );
        setShowModal(false);
        setSelectedReview(null);
      } else {
        throw new Error(data.message || 'Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="reviews-container">
      <h1 className="reviews-header">User Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={review.reviewId} className="review-item"> {/* Use reviewId here */}
              <div className="review-content">
                <div className="image-description">
                  <Image 
                    src={Pallet1} 
                    alt={review.productName} 
                    style={{ width: '12vw', height: '16vh', marginRight: '2vw' }} 
                  />
                  <div className="description">
                    <h2 className="product-name">{review.productName}</h2>
                    <p className="product-description">{review.productDescription}</p>
                  </div>
                  <button className="meatball-button" onClick={() => toggleMenu(index)}>•••</button>
                  {showMenu[index] && (
                    <div className="meatball-menu">
                      <button onClick={() => handleEditReview(review.reviewId, review)}>Edit</button> {/* Use reviewId here */}
                      <button onClick={() => handleDeleteReview(review.reviewId)}>Delete</button> {/* Use reviewId here */}
                    </div>
                  )}
                </div>
                <div className="review-rating-comment">
                  <p className="review-comment">{review.comment}</p>
                  <RatingStars rating={review.rating} />
                </div>
                <div className="review-dates">
                  <p className="review-date">{new Date(review.createdAt || '').toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && selectedReview && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Review</h2>
            <form onSubmit={handleSaveReview}>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <StarRatingInput rating={selectedReview.data.rating || 0} onChange={handleStarChange} />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  value={selectedReview.data.comment || ''}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="button-4">Save</button>
                <button type="button" className="button-4" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .reviews-container {
          width: 100%; /* Make the container take the full width */
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #121212; /* Dark background color */
          color: #e0e0e0; /* Light text color */
        }

        .reviews-header {
          margin-bottom: 20px;
          color: #888888; /* Grey text color */
          text-align: left; /* Move the header to the left */
          font-size: 1.5em; /* Adjust the font size */
        }

        .reviews-list {
          list-style: none;
          padding: 0;
        }

        .review-item {
          background: #1e1e1e; /* Dark background for review items */
          border: 1px solid #333;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .review-content {
          display: flex;
          flex-direction: column;
        }

        .image-description {
          display: flex;
          align-items: center;
        }

        .description {
          margin-left: 20px;
        }

        .product-name {
          color: #ffffff !important; /* Light text color */
        }

        .product-description {
          color: #888888 !important; /* Grey color for product description */
        }

        .review-content p {
          margin: 5px 0;
          color: #e0e0e0; /* Light text color */
        }

        .review-rating-comment {
          position: absolute;
          bottom: 20px; /* Adjust as needed */
          right: 20px; /* Adjust as needed */
          text-align: right;
        }

        .review-comment {
          color: #e0e0e0; /* Light text color */
        }

        .review-date {
          font-size: 0.9em;
          color: #38B2AC !important; /* Custom color for date */
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

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 200;
        }

        .modal-content {
          background: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #333;
          border-radius: 4px;
          background: #2c2c2c;
          color: #e0e0e0; /* Light text color */
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
        }

        .button-4 {
          appearance: none;
          background-color: #2c8b87;
          border: 1px solid rgba(27, 31, 35, 0.15);
          border-radius: 6px;
          box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
          box-sizing: border-box;
          color: #ffffff;
          cursor: pointer;
          display: inline-block;
          font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          list-style: none;
          padding: 10px 16px;
          position: relative;
          transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
          word-wrap: break-word;
          margin-right: 10px;
        }

        .button-4:hover {
          background-color: #247f79;
          text-decoration: none;
          transition-duration: 0.1s;
        }

        .button-4:disabled {
          background-color: #FAFBFC;
          border-color: rgba(27, 31, 35, 0.15);
          color: #959DA5;
          cursor: default;
        }

        .button-4:active {
          background-color: #247f79;
          box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
          transition: none 0s;
        }

        .button-4:focus {
          outline: 1px transparent;
        }

        .button-4:before {
          display: none;
        }

        .button-4:-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UserReviews;
