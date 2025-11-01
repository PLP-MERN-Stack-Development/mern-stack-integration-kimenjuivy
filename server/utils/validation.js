const Joi = require('joi');

const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    category: Joi.string().required(),
    published: Joi.boolean()
  });
  return schema.validate(data);
};

const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500)
  });
  return schema.validate(data);
};

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

const validateComment = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    post: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = {
  validatePost,
  validateCategory,
  validateUser,
  validateLogin,
  validateComment
};