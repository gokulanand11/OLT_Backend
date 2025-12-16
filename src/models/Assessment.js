import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    text: String,
    options: [String],
    correctIndex: Number
  },
  { _id: false }
);

const ResultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: Number,
    passed: Boolean,
    submittedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const AssessmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    passMark: { type: Number, default: 70 },
    questions: [QuestionSchema],
    results: [ResultSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", AssessmentSchema);