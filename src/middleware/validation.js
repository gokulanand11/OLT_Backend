import Joi from "joi";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message,
      field: error.details[0].path[0]
    });
  }
  req.validatedData = value;
  next();
};

export const validateParams = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message,
      field: error.details[0].path[0]
    });
  }
  req.validatedParams = value;
  next();
};

export const schemas = {
  objectId: Joi.string().hex().length(24),
  signup: Joi.object({
    name: Joi.string().min(2).max(50).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(1).required(),
    role: Joi.string().valid("learner", "instructor", "admin").default("learner")
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  course: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow(""),
    modules: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        lessons: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            contentUrl: Joi.string().uri().allow(""),
            duration: Joi.number().min(0).default(0)
          })
        ).default([])
      })
    ).default([])
  })
};