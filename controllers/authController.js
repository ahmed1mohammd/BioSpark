import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Register user
// @route   POST /api/auth/register (added for convenience to create first admin)
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if this is the first user in the system
        const isFirstUser = (await User.countDocuments()) === 0;

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role,
            status: isFirstUser ? 'active' : 'pending',
            isSuperAdmin: isFirstUser ? true : false
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide an email and password',
                code: 400
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                code: 401
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                code: 401
            });
        }

        // Check user status
        if (user.status === 'pending') {
            return res.status(403).json({
                success: false,
                error: 'Account pending approval by an admin.',
                code: 403
            });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({
                success: false,
                error: 'Account has been blocked. Please contact support.',
                code: 403
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {},
        message: 'Logged out successfully'
    });
};

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
            message: 'Profile retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            isSuperAdmin: user.isSuperAdmin
        },
        message: 'Authentication successful'
    });
};

// @desc    Get all users (Admins)
// @route   GET /api/auth/users
// @access  Private (SuperAdmin)
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort('-createdAt');
        res.status(200).json({
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user status (Approve/Block)
// @route   PUT /api/auth/users/:id/status
// @access  Private (SuperAdmin)
export const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        if (!['active', 'blocked'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status',
                code: 400
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                code: 404
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: `User ${status === 'active' ? 'approved' : 'blocked'} successfully`
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private (SuperAdmin)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
                code: 404
            });
        }

        res.status(200).json({
            success: true,
            data: {},
            message: 'User deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};
