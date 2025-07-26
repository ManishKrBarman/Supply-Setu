import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getSupplierById, requestVerification, getVerificationStatus } from '../api/supplierService';
import { Alert } from '../components/DataDisplay';
import Button from '../components/Button';

const VerificationStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-md ${getStatusColor()} mb-4`}>
      <h3 className="font-semibold text-lg capitalize">
        Status: {status || 'Not Requested'}
      </h3>
      {status === 'pending' && (
        <p>Your verification is under review. This process typically takes 1-3 business days.</p>
      )}
      {status === 'verified' && (
        <p>Congratulations! Your business is now verified. Your profile now shows the verified badge.</p>
      )}
      {status === 'rejected' && (
        <p>Unfortunately, your verification was rejected. Please review the feedback below and resubmit with the requested information.</p>
      )}
    </div>
  );
};

const SupplierVerificationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [supplierData, verificationData] = await Promise.all([
          getSupplierById(id),
          getVerificationStatus(id)
        ]);
        setSupplier(supplierData);
        setVerificationStatus(verificationData.status);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load supplier information');
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
      
      // Handle file uploads if present
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (key === 'documents' && data[key].length > 0) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append('documents', data[key][i]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });
      
      await requestVerification(id, formData);
      setSuccess(true);
      setVerificationStatus('pending');
    } catch (err) {
      console.error('Error requesting verification:', err);
      setError(err.response?.data?.message || 'Failed to submit verification request');
    } finally {
      setSubmitting(false);
    }
  };

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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Business Verification</h1>
      
      {verificationStatus && (
        <VerificationStatus status={verificationStatus} />
      )}
      
      {success && (
        <Alert variant="success" className="mb-4">
          Your verification request has been submitted successfully! We'll review your information and update your status soon.
        </Alert>
      )}
      
      {(!verificationStatus || verificationStatus === 'rejected') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Request Verification</h2>
          <p className="mb-6 text-gray-600">
            Verified businesses get a trust badge, higher visibility in search results, and access to premium features.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Registration Number
              </label>
              <input
                type="text"
                {...register('registrationNumber', { required: 'Registration number is required' })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number
              </label>
              <input
                type="text"
                {...register('gstNumber', { required: 'GST number is required' })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.gstNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.gstNumber.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supporting Documents (Business License, Registration Certificate, etc.)
              </label>
              <input
                type="file"
                multiple
                {...register('documents', { required: 'At least one document is required' })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.documents && (
                <p className="text-red-500 text-sm mt-1">{errors.documents.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
              >
                Submit for Verification
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {verificationStatus === 'verified' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-green-800">Your Business is Verified!</h3>
          <p className="mt-2 text-sm text-green-700">
            Congratulations! Your business verification is complete. Your profile now shows the verified badge,
            helping you build trust with potential customers.
          </p>
        </div>
      )}
    </div>
  );
};

export default SupplierVerificationPage;
