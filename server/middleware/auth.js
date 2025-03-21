const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

const instructorAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'instructor') {
        return res.status(403).json({ message: 'Access denied. Instructor only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = {
  auth,
  adminAuth,
  instructorAuth
}; 