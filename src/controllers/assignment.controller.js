import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Joi from "joi";

const assignSchema = Joi.object({
  courseId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  deadline: Joi.date().required(),
  attachments: Joi.array().items(Joi.string()).default([])
});

export const listAssignments = async (req, res, next) => {
  try {
    const list = await Assignment.find({}).lean();
    res.json(list);
  } catch (e) { next(e); }
};

export const createAssignment = async (req, res, next) => {
  try {
    const { value, error } = assignSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const a = await Assignment.create(value);
    res.status(201).json(a);
  } catch (e) { next(e); }
};

export const submitAssignment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      assignmentId: Joi.string().required(),
      fileUrl: Joi.string().uri().required(),
      note: Joi.string().allow("")
    });
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const exists = await Submission.findOne({ assignmentId: value.assignmentId, studentId: req.user.id });
    if (exists) return res.status(409).json({ error: "Already submitted" });

    const s = await Submission.create({
      assignmentId: value.assignmentId,
      studentId: req.user.id,
      fileUrl: value.fileUrl,
      note: value.note
    });
    res.status(201).json(s);
  } catch (e) { next(e); }
};