import User from '../models/User.js';
import Supplier from '../models/Supplier.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
    try {
        const [
            pendingApprovals,
            totalUsers,
            totalVendors,
            totalSuppliers,
            totalProducts,
            totalOrders,
            recentUsers,
            recentOrders
        ] = await Promise.all([
            User.countDocuments({ status: 'pending' }),
            User.countDocuments(),
            User.countDocuments({ role: 'vendor' }),
            User.countDocuments({ role: 'supplier' }),
            Product.countDocuments(),
            Order.countDocuments(),
            User.find().sort({ createdAt: -1 }).limit(5),
            Order.find().sort({ createdAt: -1 }).limit(5).populate('vendor', 'name')
        ]);

        res.json({
            pendingApprovals,
            totalUsers,
            totalVendors,
            totalSuppliers,
            totalProducts,
            totalOrders,
            recentUsers,
            recentOrders
        });
    } catch (error) {
        console.error('Error in getAdminStats:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get users waiting for approval
// @route   GET /api/admin/users/pending
// @access  Private/Admin
export const getUsersForApproval = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'pending' })
            .sort({ createdAt: -1 });

        res.json(pendingUsers);
    } catch (error) {
        console.error('Error in getUsersForApproval:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Approve a user
// @route   PUT /api/admin/users/:id/approve
// @access  Private/Admin
export const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'active';
        user.isApproved = true;

        await user.save();

        // Send notification to user about approval
        // This would be implemented with the notification system

        res.json({ message: 'User approved successfully', user });
    } catch (error) {
        console.error('Error in approveUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reject a user
// @route   PUT /api/admin/users/:id/reject
// @access  Private/Admin
export const rejectUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'rejected';
        user.rejectionReason = req.body.reason || 'Application rejected by admin';

        await user.save();

        // Send notification to user about rejection
        // This would be implemented with the notification system

        res.json({ message: 'User rejected successfully', user });
    } catch (error) {
        console.error('Error in rejectUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all users (with optional filtering)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const { role, status, search } = req.query;
        const filter = {};

        if (role) filter.role = role;
        if (status) filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(filter).sort({ createdAt: -1 });

        res.json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create admin account (only for initial setup)
// @route   POST /api/admin/setup
// @access  Public (but should be restricted in production)
export const createAdmin = async (req, res) => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin account already exists' });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const admin = new User({
            name,
            email,
            password,
            role: 'admin',
            status: 'active'
        });

        await admin.save();

        res.status(201).json({ message: 'Admin account created successfully' });
    } catch (error) {
        console.error('Error in createAdmin:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
