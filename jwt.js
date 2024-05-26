const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // First check request headers has authorization or not
    const authentication = req.headers.authorization;
    if(!authentication) return res.status(401).json({error: 'Token not Found'});

    // Extract  the jwt from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user information to the request object
        req.user = decoded;
        next();
    }catch{
        next(err);
    }
};

// Function to generater JWT token
const generateToken = (userData) => {
    // generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
};

module.exports = {jwtAuthMiddleware, generateToken};