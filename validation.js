//!!VALIDATION
import joi from "@hapi/joi";

const Joi = joi;

//!!REGISTER VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    role: Joi.string().min(3),
    password: Joi.string().min(3).required(),
  });

  const validation = schema.validate(data);
  return validation;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
  });

  const validation = schema.validate(data);
  return validation;
};


//!! NEW POST VALIDATION
const blogValidation = ((data)=>{
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    body: Joi.string().min(5).required(),
  });

  const validation = schema.validate(data);
  return validation;
});


//!!CONTACT-US VALIDATION
const contactValidation = (data) =>{
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
    message: Joi.string().min(3).max(1000).required(),

  });

  const validation = schema.validate(data);
  return validation;
}
// New Comment subscriber
export const newsletterValidation = (data) => {
  const schema = Joi.object({
      email: Joi.string().min(6).required().email()
  });
}
// New  subscriber
const subscriberValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
	});

  return schema.validate(data);
};
//!! NEW POST articleValidation
const articleValidation = ((data)=>{
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(5).required(),
    content: Joi.string().min(3).required(),
   
  });

  const validation = schema.validate(data);
  return validation;
});

export { registerValidation };
export { loginValidation };
export { blogValidation };
export { contactValidation };
//export { subscriberValidation };
export { articleValidation };