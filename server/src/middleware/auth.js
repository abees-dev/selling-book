import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const accessToken = bearer[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You not authenticated",
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.decoded.admin === true) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You not Admin",
      });
    }
  });
};
