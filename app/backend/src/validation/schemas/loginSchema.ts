import * as Joi from 'joi';
import { IloginUser } from '../../interfaces/User/User';
import HandleError from '../../interfaces/Error/handleError';

const messageErr = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required()
    .messages({
      'string.empty': messageErr,
      'any.required': messageErr,
    }),

  password: Joi
    .string()
    .min(6)
    .required()
    .messages({
      'string.empty': messageErr,
      'any.required': messageErr,
    }),
});

const loginValidate = (user: IloginUser): void => {
  const { error } = loginSchema.validate(user);
  console.log(error);

  if (error) throw new HandleError('ValidationError', error.message);
};

export default loginValidate;
