import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.split(' ')[1], 'secret'); // Assuming the token is of format "Bearer <token>"

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Move to the next middleware
    next();
  } catch (error) {
    // Return an error if token is invalid or expired
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
