import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    });
  } catch (e) { next(e); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, profile } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        ...(name && { name }),
        ...(profile && { profile: { ...profile } })
      },
      { new: true, runValidators: true }
    );
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
      message: "Profile updated successfully"
    });
  } catch (e) { next(e); }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id).select('+passwordHash');
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) return res.status(400).json({ error: "Current password is incorrect" });
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    user.passwordHash = passwordHash;
    await user.save();
    
    res.json({ message: "Password changed successfully" });
  } catch (e) { next(e); }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ isActive: true }),
      learners: await User.countDocuments({ role: "learner" }),
      instructors: await User.countDocuments({ role: "instructor" }),
      admins: await User.countDocuments({ role: "admin" })
    };
    
    res.json(stats);
  } catch (e) { next(e); }
};