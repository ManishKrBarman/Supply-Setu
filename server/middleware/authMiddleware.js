import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes middleware
export const protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Check user status - allow admins to always pass
            if (req.user.role === 'admin') {
                return next(); // Admins can always access
            }

            // For non-admin users, check if they are approved/active
            if (req.user.status === 'pending') {
                return res.status(403).json({
                    message: 'Your account is pending approval. Please contact support.',
                    status: req.user.status
                });
            }

            if (req.user.status === 'rejected') {
                return res.status(403).json({
                    message: 'Your account has been rejected. Please contact support.',
                    status: req.user.status
                });
            }

            if (req.user.status === 'suspended') {
                return res.status(403).json({
                    message: 'Your account has been suspended. Please contact support.',
                    status: req.user.status
                });
            }

            // Allow users with 'approved' or 'active' status
            if (req.user.status === 'approved' || req.user.status === 'active') {
                return next();
            }

            // Default deny for unknown status
            return res.status(403).json({
                message: 'Account access denied. Please contact support.',
                status: req.user.status
            });

        } catch (error) {
            console.error('Auth middleware error:', error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

// Supplier middleware
export const supplier = (req, res, next) => {
    if (req.user && req.user.role === 'supplier') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as supplier' });
    }
};

// Vendor middleware
export const vendor = (req, res, next) => {
    if (req.user && req.user.role === 'vendor') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as vendor' });
    }
};

// Combined middleware for specific roles
export const checkRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Not authorized. This action requires one of these roles: ${roles.join(', ')}`
            });
        }

        next();
    };
};
