import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getSupplierById, getSupplierRatings, rateSupplier } from '../api/supplierService';
import { getCurrentUser } from '../api/authService';
import { Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { FaStar, FaRegStar, FaUser, FaClock } from 'react-icons/fa';

const RatingStars = ({ rating, interactive = false, onChange = () => {} }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star}
          className={`cursor-${interactive ? 'pointer' : 'default'} text-2xl`}
          onClick={() => interactive && onChange(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          {(hoverRating || rating) >= star 
            ? <FaStar className="text-yellow-400" /> 
            : <FaRegStar className="text-gray-400" />
          }
        </div>
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SupplierRatingsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = getCurrentUser();
        setCurrentUser(user);
        
        const [supplierData, ratingsData] = await Promise.all([
          getSupplierById(id),
          getSupplierRatings(id)
        ]);
        
        setSupplier(supplierData);
        setRatings(ratingsData);
        
        // Check if current user has already rated this supplier
        if (user && ratingsData.some(rating => rating.userId === user.id)) {
          setUserHasRated(true);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load supplier ratings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);
      
      await rateSupplier(id, data.rating, data.review);
      
      // Refresh ratings
      const updatedRatings = await getSupplierRatings(id);
      setRatings(updatedRatings);
      
      setSuccess(true);
      setUserHasRated(true);
      reset();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating
  const averageRating = ratings.length 
    ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length 
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{supplier?.name || 'Supplier'} - Ratings & Reviews</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-indigo-700">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-lg text-gray-500 ml-2">out of 5</span>
            </div>
            
            <div className="mt-2">
              <RatingStars rating={averageRating} />
            </div>
            
            <div className="mt-1 text-sm text-gray-500">
              Based on {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded h-2 mr-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${(ratings.filter(r => r.rating === 5).length / ratings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">5 stars</div>
              </div>
              <div className="text-sm text-gray-500">
                {ratings.filter(r => r.rating === 5).length}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded h-2 mr-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${(ratings.filter(r => r.rating === 4).length / ratings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">4 stars</div>
              </div>
              <div className="text-sm text-gray-500">
                {ratings.filter(r => r.rating === 4).length}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded h-2 mr-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${(ratings.filter(r => r.rating === 3).length / ratings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">3 stars</div>
              </div>
              <div className="text-sm text-gray-500">
                {ratings.filter(r => r.rating === 3).length}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded h-2 mr-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${(ratings.filter(r => r.rating === 2).length / ratings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">2 stars</div>
              </div>
              <div className="text-sm text-gray-500">
                {ratings.filter(r => r.rating === 2).length}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded h-2 mr-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${(ratings.filter(r => r.rating === 1).length / ratings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">1 star</div>
              </div>
              <div className="text-sm text-gray-500">
                {ratings.filter(r => r.rating === 1).length}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add a review section */}
      {currentUser && !userHasRated && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          
          {success && (
            <Alert variant="success" className="mb-4">
              Your review has been submitted successfully!
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div>
                <input 
                  type="hidden"
                  {...register('rating', { required: 'Please select a rating' })}
                />
                <RatingStars
                  rating={0}
                  interactive={true}
                  onChange={(rating) => setValue('rating', rating)}
                />
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review
              </label>
              <textarea
                {...register('review', { 
                  required: 'Please write a review',
                  minLength: {
                    value: 10,
                    message: 'Review must be at least 10 characters long'
                  }
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Share your experience with this supplier..."
              ></textarea>
              {errors.review && (
                <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
              )}
            </div>
            
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {/* Reviews list */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {ratings.length > 0 ? 'Customer Reviews' : 'No Reviews Yet'}
        </h2>
        
        <div className="space-y-6">
          {ratings.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <RatingStars rating={review.rating} />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {review.rating.toFixed(1)} out of 5
                    </span>
                  </div>
                  
                  <h3 className="mt-1 font-medium text-gray-900 flex items-center">
                    <FaUser className="text-gray-400 mr-1" />
                    {review.userName || 'Anonymous User'}
                  </h3>
                </div>
                
                <div className="text-sm text-gray-500 flex items-center">
                  <FaClock className="mr-1" />
                  {formatDate(review.createdAt)}
                </div>
              </div>
              
              <p className="mt-2 text-gray-600">
                {review.review}
              </p>
            </div>
          ))}
          
          {ratings.length === 0 && (
            <p className="text-gray-500 italic">
              Be the first to review this supplier!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierRatingsPage;
