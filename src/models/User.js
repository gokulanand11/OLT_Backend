import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["learner", "instructor", "admin"], default: "learner" },
    profile: {
      avatar: { type: String, default: "" },
      bio: { type: String, default: "" },
      skills: [{ type: String }],
      socialLinks: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        website: { type: String, default: "" }
      }
    },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    emailVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);