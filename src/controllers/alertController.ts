// import { Request, Response } from 'express';
// import { alertHomeOwner } from '../services/alertService';

// export const alertOwner = async (req: Request, res: Response) => {
//   try {
//     const { userId, message } = req.body;
//     const result = await alertHomeOwner(userId, message);
//     res.json(result);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
