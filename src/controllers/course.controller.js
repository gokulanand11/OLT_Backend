import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";
import Joi from "joi";

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  modules: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      lessons: Joi.array().items(
        Joi.object({
          title: Joi.string().required(),
          contentUrl: Joi.string().allow(""),
          duration: Joi.number().min(0).default(0)
        })
      ).default([])
    })
  ).default([])
});

export const listCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("instructorId", "name email").lean();
    res.json(courses);
  } catch (e) { next(e); }
};

export const getCourse = async (req, res, next) => {
  try {
    const { error } = Joi.string().hex().length(24).validate(req.params.id);
    if (error) return res.status(400).json({ error: "Invalid ID format" });
    
    const course = await Course.findById(req.params.id)
      .populate({ path: "modules", populate: { path: "lessons" } })
      .lean();
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (e) { next(e); }
};

export const createCourse = async (req, res, next) => {
  try {
    const { value, error } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const course = await Course.create({
      title: value.title,
      description: value.description,
      instructorId: req.user.id
    });

    // Create modules and lessons
    for (const m of value.modules) {
      const module = await Module.create({ title: m.title, courseId: course._id });
      for (const l of m.lessons) {
        const lesson = await Lesson.create({
          moduleId: module._id,
          title: l.title,
          contentUrl: l.contentUrl,
          duration: l.duration
        });
        module.lessons.push(lesson._id);
      }
      await module.save();
      course.modules.push(module._id);
    }

    await course.save();
    const populated = await Course.findById(course._id)
      .populate({ path: "modules", populate: { path: "lessons" } });
    res.status(201).json(populated);
  } catch (e) { next(e); }
};