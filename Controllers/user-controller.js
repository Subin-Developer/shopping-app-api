import usermodel from "../Models/usermodel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken package

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    "secret",
    { expiresIn: '1h' } 
  );
};

export const getAllusers = async (req, res, next) => {
  let users;
  try {
    console.log("here1")
    users = await usermodel.find();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "Users not found" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  console.log("called");
  const { name, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  let existingUser;
  try {
    existingUser = await usermodel.findOne({ email });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedpassword = bcrypt.hashSync(password, 10);

  const user = new usermodel({
    name,
    email,
    password: hashedpassword,
  });

  try {
    await user.save();

    const token = generateToken(user);

    return res.status(201).json({ user, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const login = async (req, res, next) => {
  console.log("called");
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await usermodel.findOne({ email });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not exists" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "Incorrect password" });
  }

  // Generate JWT token
  const token = generateToken(existingUser);

  return res.status(200).json({ message: "Login success", token });
};
