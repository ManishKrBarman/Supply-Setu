import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import adminAuth from '../adminAuth';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Redirect if already authenticated as admin
    useEffect(() => {
        if (adminAuth.isAuthenticated()) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    // If already authenticated as admin, redirect
    if (adminAuth.isAuthenticated()) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('Attempting admin login...');
            await adminAuth.login(formData.email, formData.password);
            console.log('Admin login successful, redirecting...');
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Admin login error:', err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center mb-6">
                        <FaLock className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">
                        Admin Portal
                    </h2>
                    <p className="text-indigo-200">
                        Supply Setu Administration
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                            <div className="flex">
                                <div className="text-red-700">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                    loading 
                                        ? 'bg-indigo-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                } transition duration-150 ease-in-out`}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                        >
                            ← Back to Main Site
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-indigo-200 text-sm">
                        Need help? Contact system administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
