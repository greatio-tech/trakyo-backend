import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/errorHandler';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err ) {
    handleError(err, res);
  } else {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'An unknown error occurred'
    });
  }
};

export default errorMiddleware;
