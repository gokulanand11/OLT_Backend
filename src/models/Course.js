import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    externalUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);