import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'NotFound':
      res.status(404).json({ message });
      break;
    case 'UnprocessableEntity':
      res.status(422).json({ message });
      break;
    default:
      res.sendStatus(500);
  }
};

export default errorMiddleware;
