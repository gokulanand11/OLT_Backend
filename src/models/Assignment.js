import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    deadline: { type: Date, required: true },
    attachments: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", AssignmentSchema);