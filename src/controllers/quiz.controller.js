import Assessment from "../models/Assessment.js";

export const getQuizByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const assessment = await Assessment.findOne({ courseId }).lean();
    if (!assessment) return res.status(404).json({ error: "Quiz not found for this course" });
    res.json(assessment);
  } catch (e) { next(e); }
};