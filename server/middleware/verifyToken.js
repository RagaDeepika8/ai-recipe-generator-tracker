const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🛂 Received Auth Header:', authHeader); // ✅ Log the header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⛔ No token or wrong format');
    return res.status(401).json({ error: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded); // ✅ Log decoded user
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
