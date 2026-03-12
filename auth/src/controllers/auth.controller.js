import User from "../models/auth.model.js";

export const register = async (req, res) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
      role,
      isVerifyEmail,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role ||
      !isVerifyEmail
    ) {
      return res.status(400).json({ message: "All Data is Required" });
    }

    const isAlreadyExists = await User.findOne({ email });
    if (isAlreadyExists) {
      return res.status(400).json({ message: "Email is Already Exits" });
    }

    const user = await User.create({
      fullName: { firstName, lastName },
      email,
      password,
      role,
      isVerifyEmail,
    });

    return res.status(201).json({ message: "User is Created", user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = (req, res) => {
  res.send("Hello World 123");
};

export const logout = (req, res) => {
  res.send("Hello World 123");
};

export const profile = (req, res) => {
  res.send("Hello World 123");
};
