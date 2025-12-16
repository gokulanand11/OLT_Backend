import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
  },
  { timestamps: true }
);

export default mongoose.model("Module", ModuleSchema);