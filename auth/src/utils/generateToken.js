import jwt from "jsonwebtoken";
import config from "../configs/config.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, fullName: user.fullName, email: user.email },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};

export default generateToken;
