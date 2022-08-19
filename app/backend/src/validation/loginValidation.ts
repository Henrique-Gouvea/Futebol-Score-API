// import { IUserValidation } from '../interfaces/User/UserValidation';
// import loginSchema from './schemas/loginSchema';
// import HandleError from '../interfaces/Error/handleError';
// import { IloginUser } from '../interfaces/User/User';

// class loginValidate implements IUserValidation {
//   private user : IloginUser;

//   constructor(user: IloginUser) {
//     this.user = user;
//   }

//   validate(user: IloginUser) {
//     const { error } = loginSchema.validate(user);
//     console.log(this.user);

//     if (error) throw new HandleError('ValidationError', error.message);
//   }
// }

// export default loginValidate;
