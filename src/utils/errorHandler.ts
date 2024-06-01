import { Response } from 'express'; 

class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; 
    Error.captureStackTrace(this, this.constructor); 
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

export default ErrorHandler;
