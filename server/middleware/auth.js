const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.cookies; //req.cookies doesnt seem to exist changed to req.headers.cookies

  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};

module.exports = protect;
