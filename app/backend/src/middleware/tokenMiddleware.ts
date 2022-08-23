import { Request, Response, NextFunction } from 'express';
// import { JwtPayload, verify } from 'jsonwebtoken';
import HandleError from '../interfaces/Error/handleError';
import { IToken } from '../interfaces/Providers/IToken';

class tokenMiddleware {
  constructor(
    private token: IToken,
  ) { }

  async checkTokenMiddleware(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new HandleError('Unauthorized', 'Invalid token');
      }

      const data = await this.token.checkToken(authHeader);
      req.body.user = data;
      console.log(data);

      next();
    } catch (err) {
      console.log(err);

      next(err);
    }
  }
}

export default tokenMiddleware;

// const tokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       throw new HandleError('Unauthorized', 'Invalid token');
//     }
//     const response = IToken;
//     req.body.user = response.data;
//     console.log(response.data);

//     next();
//   } catch (err) {
//     console.log(err);

//     next(err);
//   }
// };

// export default tokenMiddleware;
