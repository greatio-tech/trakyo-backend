// import { Request, Response, NextFunction } from 'express';
// import { handleError } from '../utils/errorHandler';

// const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err ) {
//     handleError(err, res);
//   } else {
//     res.status(500).json({
//       status: 'error',
//       statusCode: 500,
//       message: 'An unknown error occurred'
//     });
//   }
// };

// export default errorMiddleware;

import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('%c' + err, 'color: red;');

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorMiddleware;
