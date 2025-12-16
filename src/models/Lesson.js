import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    contentUrl: { type: String, default: "" },
    duration: { type: Number, default: 0 } // minutes
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", LessonSchema);