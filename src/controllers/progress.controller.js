import Progress from "../models/Progress.js";
import Joi from "joi";

export const getCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const p = await Progress.findOne({ userId: req.user.id, courseId }).lean();
    res.json(p || { completionPercentage: 0, moduleProgress: {}, lessonProgress: {} });
  } catch (e) { next(e); }
};

export const markLessonComplete = async (req, res, next) => {
  try {
    const schema = Joi.object({
      courseId: Joi.string().required(),
      lessonId: Joi.string().required(),
      moduleId: Joi.string().required()
    });
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    let p = await Progress.findOne({ userId: req.user.id, courseId: value.courseId });
    if (!p) p = await Progress.create({ userId: req.user.id, courseId: value.courseId });

    p.lessonProgress.set(value.lessonId, true);
    const current = p.moduleProgress.get(value.moduleId) || 0;
    p.moduleProgress.set(value.moduleId, Math.min(100, current + 10));
    const vals = Array.from(p.moduleProgress.values());
    p.completionPercentage = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    p.lastAccessedAt = new Date();
    await p.save();

    res.json(p);
  } catch (e) { next(e); }
};