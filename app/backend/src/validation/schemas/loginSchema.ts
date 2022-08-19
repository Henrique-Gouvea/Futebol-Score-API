import * as Joi from 'joi';
import { IloginUser } from '../../interfaces/User/User';
import HandleError from '../../interfaces/Error/handleError';

const loginSchema = Joi.object({
  email: Joi
    .string()
    .required()
    .messages({
      'any-required': 'All fields must be filled',
    }),

  password: Joi
    .string()
    .required()
    .messages({
      'any-required': 'All fields must be filled',
    }),
});

const loginValidate = (user: IloginUser): void => {
  const { error } = loginSchema.validate(user);

  if (error) throw new HandleError('ValidationError', error.message);
};

export default loginValidate;
