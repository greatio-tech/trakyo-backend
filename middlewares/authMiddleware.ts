// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import config from '../config/config';
// import { IRequest } from '../interfaces/IRequest';

// const authMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
//   // Get token from header
//   const token = req.header('x-auth-token');

//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwtSecret);

//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// export default authMiddleware;
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../interfaces/IUser';
import { IRequest } from '../interfaces/IRequest';

const authMiddleware = (req: IRequest, res: Response, next: NextFunction) => {

  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    req.user = { id: decoded.id } as IUser; 

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
