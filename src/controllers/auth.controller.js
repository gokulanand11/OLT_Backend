import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import User from "../models/User.js";
import { validate, schemas } from "../middleware/validation.js";



const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpires }
  );

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.validatedData;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role });
    
    const token = signToken(user);
    const userResponse = { id: user._id, name: user.name, email: user.email, role: user.role };
    
    res.status(201).json({ 
      token, 
      user: userResponse,
      message: "Account created successfully"
    });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    const token = signToken(user);
    const userResponse = { id: user._id, name: user.name, email: user.email, role: user.role };
    
    res.json({ 
      token, 
      user: userResponse,
      message: "Login successful"
    });
  } catch (e) { next(e); }
};

