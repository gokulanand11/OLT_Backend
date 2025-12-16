import Assessment from "../models/Assessment.js";
import Joi from "joi";

export const getAssessment = async (req, res, next) => {
  try {
    const { error } = Joi.string().hex().length(24).validate(req.params.id);
    if (error) return res.status(400).json({ error: "Invalid ID format" });
    
    const a = await Assessment.findById(req.params.id).lean();
    if (!a) return res.status(404).json({ error: "Assessment not found" });
    res.json(a);
  } catch (e) { next(e); }
};

export const createAssessment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      courseId: Joi.string().required(),
      title: Joi.string().required(),
      passMark: Joi.number().min(0).max(100).default(70),
      questions: Joi.array().items(
        Joi.object({
          text: Joi.string().required(),
          options: Joi.array().items(Joi.string()).min(2).required(),
          correctIndex: Joi.number().required()
        })
      ).required()
    });

    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const a = await Assessment.create(value);
    res.status(201).json(a);
  } catch (e) { next(e); }
};

export const submitAssessment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      answers: Joi.array().items(Joi.number().required()).required()
    });
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const a = await Assessment.findById(req.params.id);
    if (!a) return res.status(404).json({ error: "Assessment not found" });

    const scoreRaw = a.questions.reduce((acc, q, i) => acc + (q.correctIndex === value.answers[i] ? 1 : 0), 0);
    const score = Math.round((scoreRaw / a.questions.length) * 100);
    const passed = score >= a.passMark;

    a.results.push({ studentId: req.user.id, score, passed, submittedAt: new Date() });
    await a.save();

    res.json({ score, passed });
  } catch (e) { next(e); }
};