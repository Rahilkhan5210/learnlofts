

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log('Authentication middleware called for:', req.method, req.path);
    console.log('Cookies:', req.cookies);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const token = req.cookies.token;
    // Check token
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ msg: "Please login to access this resource" });
    }
    
    console.log('Token found:', token.substring(0, 20) + '...');
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log('Token is invalid');
      return res.status(401).json({ msg: "Token is invalid" });
    }

    console.log('Token decoded successfully:', decoded);
    
    // Assign decoded user info to req.user
    req.user = { id: decoded.userId };  // Use userId from decoded token
    next();

  } catch (error) {
    console.log('Authentication error:', error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export default isAuthenticated;
