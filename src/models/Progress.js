import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    moduleProgress: { type: Map, of: Number, default: {} }, // moduleId -> %
    lessonProgress: { type: Map, of: Boolean, default: {} }, // lessonId -> completed
    completionPercentage: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Progress", ProgressSchema);