import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SupplierProfile from '../models/SupplierProfile.js';
import VendorProfile from '../models/VendorProfile.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a vendor
// @route   POST /api/users/register/vendor
// @access  Public
export const registerVendor = async (req, res) => {
    const {
        name,
        email,
        password,
        businessName,
        contactPhone,
        foodType,
        address
    } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with vendor role
        const user = await User.create({
            name,
            email,
            password,
            role: 'vendor',
            status: 'pending',
            location: {
                address: {
                    street: address || 'Not specified',
                    city: 'Not specified',
                    state: 'Not specified',
                    country: 'India',
                    pincode: '000000'
                }
            }
        });

        // Create vendor profile
        const vendorProfile = await VendorProfile.create({
            user: user._id,
            businessName,
            contactPhone,
            foodType: Array.isArray(foodType) ? foodType : [foodType],
            address: {
                street: address || 'Not specified',
                city: 'Not specified',
                state: 'Not specified',
                country: 'India',
                pincode: '000000'
            }
        });

        if (user && vendorProfile) {
            res.status(201).json({
                success: true,
                message: 'Vendor registered successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    businessName: vendorProfile.businessName
                },
                token: generateToken(user._id)
            });
        } else {
            // If something goes wrong, delete the user and vendor profile
            await User.deleteOne({ _id: user._id });
            await VendorProfile.deleteOne({ user: user._id });

            res.status(400).json({ message: 'Invalid vendor data' });
        }
    } catch (error) {
        console.error('Error in registerVendor:', error);

        // Log detailed error information
        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message
            }));
            console.error('Validation errors:', validationErrors);
            return res.status(400).json({
                message: 'Validation Error',
                errors: validationErrors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Duplicate field error',
                error: 'A user with this email or data already exists'
            });
        }

        res.status(500).json({
            message: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
};

// @desc    Register a supplier
// @route   POST /api/users/register/supplier
// @access  Public
export const registerSupplier = async (req, res) => {
    const {
        name,
        email,
        password,
        businessName,
        contactPerson,
        contactEmail,
        contactPhone,
        address,
        gstNumber,
        businessType,
        categories
    } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with supplier role
        const user = await User.create({
            name,
            email,
            password,
            role: 'supplier',
            status: 'pending',
            location: {
                address: {
                    street: address || 'Not specified',
                    city: 'Not specified',
                    state: 'Not specified',
                    country: 'India',
                    pincode: '000000'
                }
            }
        });

        // Create supplier profile
        const supplierProfile = await SupplierProfile.create({
            user: user._id,
            businessName,
            contactPerson,
            contactEmail,
            contactPhone,
            address: {
                street: address || 'Not specified',
                city: 'Not specified',
                state: 'Not specified',
                country: 'India',
                pincode: '000000'
            },
            gstNumber,
            businessType,
            categories: Array.isArray(categories) ? categories : [categories]
        });

        if (user && supplierProfile) {
            res.status(201).json({
                success: true,
                message: 'Supplier registered successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    businessName: supplierProfile.businessName
                },
                token: generateToken(user._id)
            });
        } else {
            // If something goes wrong, delete the user and supplier profile
            await User.deleteOne({ _id: user._id });
            await SupplierProfile.deleteOne({ user: user._id });

            res.status(400).json({ message: 'Invalid supplier data' });
        }
    } catch (error) {
        console.error('Error in registerSupplier:', error);

        // Log detailed error information
        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message
            }));
            console.error('Validation errors:', validationErrors);
            return res.status(400).json({
                message: 'Validation Error',
                errors: validationErrors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Duplicate field error',
                error: 'A user with this email or data already exists'
            });
        }

        res.status(500).json({
            message: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
};

// @desc    Register an admin (only for initial setup or by existing admin)
// @route   POST /api/users/register/admin
// @access  Private/Admin
export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new admin user
        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
            status: 'active',
            isApproved: true
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        console.error('Error in registerAdmin:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check user status based on role
        if (user.role === 'admin') {
            // Admins can login regardless of status
            console.log(`Admin login: ${user.email}`);
        } else {
            // Regular users need proper status
            if (user.status === 'pending') {
                return res.status(403).json({
                    message: 'Your account is pending approval. Please contact support.',
                    status: user.status
                });
            }

            if (user.status === 'rejected') {
                return res.status(403).json({
                    message: 'Your account has been rejected. Please contact support.',
                    status: user.status,
                    reason: user.rejectionReason || 'No reason provided'
                });
            }

            if (user.status === 'suspended') {
                return res.status(403).json({
                    message: 'Your account has been suspended. Please contact support.',
                    status: user.status
                });
            }

            if (user.status !== 'approved' && user.status !== 'active') {
                return res.status(403).json({
                    message: 'Account access denied. Please contact support.',
                    status: user.status
                });
            }
        }

        let profileData = {};

        // Get role-specific profile data
        if (user.role === 'supplier') {
            const supplierProfile = await SupplierProfile.findOne({ user: user._id });
            if (supplierProfile) {
                profileData = {
                    businessName: supplierProfile.businessName,
                    contactPerson: supplierProfile.contactPerson,
                    categories: supplierProfile.categories,
                };
            }
        } else if (user.role === 'vendor') {
            const vendorProfile = await VendorProfile.findOne({ user: user._id });
            if (vendorProfile) {
                profileData = {
                    businessName: vendorProfile.businessName,
                    foodType: vendorProfile.foodType,
                };
            }
        }

        // Generate token
        const token = generateToken(user._id);

        // Send response
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                ...profileData
            },
            token
        });

    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({
            message: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            let profileData = {};

            // Get role-specific profile data
            if (user.role === 'supplier') {
                const supplierProfile = await SupplierProfile.findOne({ user: user._id });
                if (supplierProfile) {
                    profileData = {
                        businessName: supplierProfile.businessName,
                        contactPerson: supplierProfile.contactPerson,
                        contactEmail: supplierProfile.contactEmail,
                        contactPhone: supplierProfile.contactPhone,
                        address: supplierProfile.address,
                        gstNumber: supplierProfile.gstNumber,
                        businessType: supplierProfile.businessType,
                        categories: supplierProfile.categories,
                        ratings: supplierProfile.ratings,
                        createdAt: supplierProfile.createdAt
                    };
                }
            } else if (user.role === 'vendor') {
                const vendorProfile = await VendorProfile.findOne({ user: user._id });
                if (vendorProfile) {
                    profileData = {
                        businessName: vendorProfile.businessName,
                        contactPhone: vendorProfile.contactPhone,
                        foodType: vendorProfile.foodType,
                        address: vendorProfile.address,
                        ratings: vendorProfile.ratings,
                        createdAt: vendorProfile.createdAt
                    };
                }
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                location: user.location,
                ...profileData
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all pending approval users
// @route   GET /api/users/pending
// @access  Private/Admin
export const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'pending' }).select('-password');

        const usersWithProfiles = await Promise.all(
            pendingUsers.map(async (user) => {
                let profileData = {};

                if (user.role === 'supplier') {
                    const profile = await SupplierProfile.findOne({ user: user._id });
                    if (profile) {
                        profileData = {
                            businessName: profile.businessName,
                            contactPerson: profile.contactPerson,
                            gstNumber: profile.gstNumber,
                            businessType: profile.businessType,
                            categories: profile.categories
                        };
                    }
                } else if (user.role === 'vendor') {
                    const profile = await VendorProfile.findOne({ user: user._id });
                    if (profile) {
                        profileData = {
                            businessName: profile.businessName,
                            foodType: profile.foodType
                        };
                    }
                }

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    createdAt: user.createdAt,
                    ...profileData
                };
            })
        );

        res.json(usersWithProfiles);
    } catch (error) {
        console.error('Error in getPendingUsers:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Approve or reject a user account
// @route   PUT /api/users/:id/approval
// @access  Private/Admin
export const updateUserApproval = async (req, res) => {
    const { status, rejectionReason } = req.body;

    if (!['active', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = status;

        if (status === 'rejected' && rejectionReason) {
            user.rejectionReason = rejectionReason;
        }

        await user.save();

        res.json({
            message: `User ${status === 'active' ? 'approved' : 'rejected'} successfully`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Error in updateUserApproval:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all users (for admin dashboard)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error in getUsers:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete associated profile
        if (user.role === 'supplier') {
            await SupplierProfile.deleteOne({ user: user._id });
        } else if (user.role === 'vendor') {
            await VendorProfile.deleteOne({ user: user._id });
        }

        await User.deleteOne({ _id: user._id });

        res.json({ message: 'User removed successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.address) {
                user.location = user.location || {};
                user.location.address = req.body.address;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            // Update role-specific profiles
            if (user.role === 'supplier') {
                const supplierProfile = await SupplierProfile.findOne({ user: user._id });
                if (supplierProfile && req.body.profileData) {
                    const {
                        businessName,
                        contactPerson,
                        contactEmail,
                        contactPhone,
                        address,
                        businessType,
                        categories
                    } = req.body.profileData;

                    supplierProfile.businessName = businessName || supplierProfile.businessName;
                    supplierProfile.contactPerson = contactPerson || supplierProfile.contactPerson;
                    supplierProfile.contactEmail = contactEmail || supplierProfile.contactEmail;
                    supplierProfile.contactPhone = contactPhone || supplierProfile.contactPhone;
                    supplierProfile.address = address || supplierProfile.address;
                    supplierProfile.businessType = businessType || supplierProfile.businessType;

                    if (categories && categories.length > 0) {
                        supplierProfile.categories = categories;
                    }

                    await supplierProfile.save();
                }
            } else if (user.role === 'vendor') {
                const vendorProfile = await VendorProfile.findOne({ user: user._id });
                if (vendorProfile && req.body.profileData) {
                    const {
                        businessName,
                        contactPhone,
                        foodType,
                        address
                    } = req.body.profileData;

                    vendorProfile.businessName = businessName || vendorProfile.businessName;
                    vendorProfile.contactPhone = contactPhone || vendorProfile.contactPhone;
                    vendorProfile.foodType = foodType || vendorProfile.foodType;
                    vendorProfile.address = address || vendorProfile.address;

                    await vendorProfile.save();
                }
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                status: updatedUser.status,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
