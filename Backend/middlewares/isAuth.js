import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // verify token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // add userId in request
    req.userId = verifiedToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
