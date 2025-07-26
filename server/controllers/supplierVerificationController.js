import Supplier from '../models/Supplier.js';
import Rating from '../models/Rating.js';
import User from '../models/User.js';

// @desc    Request supplier verification
// @route   POST /api/suppliers/:id/verification/request
// @access  Private/Supplier
export const requestVerification = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Check if the user is the owner of this supplier account
        if (supplier.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to request verification for this supplier' });
        }

        // Update supplier with verification request data
        supplier.verificationStatus = 'pending';
        supplier.verificationData = {
            registrationNumber: req.body.registrationNumber,
            gstNumber: req.body.gstNumber,
            address: req.body.address,
            documents: req.files ? req.files.map(file => file.path) : [],
            requestedAt: new Date()
        };

        await supplier.save();

        res.status(200).json({
            message: 'Verification request submitted successfully',
            status: 'pending'
        });
    } catch (error) {
        console.error('Error in requestVerification:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get supplier verification status
// @route   GET /api/suppliers/:id/verification/status
// @access  Private/Supplier
export const getVerificationStatus = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({
            status: supplier.verificationStatus,
            requestedAt: supplier.verificationData?.requestedAt,
            verifiedAt: supplier.verificationData?.verifiedAt,
            rejectionReason: supplier.verificationData?.rejectionReason
        });
    } catch (error) {
        console.error('Error in getVerificationStatus:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Admin approve supplier verification
// @route   PUT /api/suppliers/:id/verification/approve
// @access  Private/Admin
export const approveVerification = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.verificationStatus = 'verified';
        supplier.isVerified = true;
        supplier.verificationData = {
            ...supplier.verificationData,
            verifiedAt: new Date(),
            verifiedBy: req.user.id
        };

        await supplier.save();

        res.status(200).json({
            message: 'Supplier verification approved',
            status: 'verified'
        });
    } catch (error) {
        console.error('Error in approveVerification:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Admin reject supplier verification
// @route   PUT /api/suppliers/:id/verification/reject
// @access  Private/Admin
export const rejectVerification = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.verificationStatus = 'rejected';
        supplier.verificationData = {
            ...supplier.verificationData,
            rejectedAt: new Date(),
            rejectedBy: req.user.id,
            rejectionReason: req.body.reason
        };

        await supplier.save();

        res.status(200).json({
            message: 'Supplier verification rejected',
            status: 'rejected'
        });
    } catch (error) {
        console.error('Error in rejectVerification:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Rate a supplier
// @route   POST /api/suppliers/:id/ratings
// @access  Private
export const rateSupplier = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const supplierId = req.params.id;
        const userId = req.user.id;

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Check if supplier exists
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Check if user has already rated this supplier
        const existingRating = await Rating.findOne({ supplier: supplierId, user: userId });

        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
            existingRating.review = review;
            existingRating.updatedAt = Date.now();
            await existingRating.save();

            res.status(200).json({ message: 'Rating updated successfully', rating: existingRating });
        } else {
            // Create new rating
            const user = await User.findById(userId);

            const newRating = new Rating({
                supplier: supplierId,
                user: userId,
                userName: user.name,
                rating,
                review
            });

            await newRating.save();

            // Update supplier average rating
            const allRatings = await Rating.find({ supplier: supplierId });
            const avgRating = allRatings.reduce((sum, item) => sum + item.rating, 0) / allRatings.length;

            supplier.rating = avgRating.toFixed(1);
            supplier.ratingCount = allRatings.length;
            await supplier.save();

            res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
        }
    } catch (error) {
        console.error('Error in rateSupplier:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get supplier ratings
// @route   GET /api/suppliers/:id/ratings
// @access  Public
export const getSupplierRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ supplier: req.params.id })
            .sort({ createdAt: -1 });

        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error in getSupplierRatings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get nearby suppliers
// @route   GET /api/suppliers/nearby
// @access  Public
export const getNearbySuppliers = async (req, res) => {
    try {
        const { lat, lng, radius = 10 } = req.query; // radius in km

        if (!lat || !lng) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        // Find suppliers with location within the radius
        const suppliers = await Supplier.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: radius * 1000 // convert km to meters
                }
            }
        });

        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Error in getNearbySuppliers:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
