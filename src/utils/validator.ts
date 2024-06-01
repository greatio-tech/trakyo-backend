import { ValidationError, body, validationResult } from 'express-validator';
import { Request } from 'express-validator/lib/base';
import { Schema } from 'express-validator';

export const userValidationRules = () => {
  return [
    body('phoneNumber').isString().isLength({ min: 10, max: 15 }),
    body('name').optional().isString().isLength({ min: 1, max: 100 }),
    body('email').optional().isEmail(),
    body('dob').optional().isDate(),
    body('emergencyContacts').optional().isArray(),
    body('emergencyContacts.*.name').optional().isString().isLength({ min: 1, max: 100 }),
    body('emergencyContacts.*.phoneNumber').optional().isString().isLength({ min: 10, max: 15 }),
  ];
};

export const authValidationRules = () => {
  return [
    body('phoneNumber').isString().isLength({ min: 10, max: 15 }),
    body('otp').optional().isString().isLength({ min: 6, max: 6 }),
    body('token').optional().isString(),
  ];
};

export const qrCodeValidationRules = () => {
  return [
    body('code').isString().isLength({ min: 1, max: 100 }),
    body('owner').isString(),
    body('vehicleDetails').optional().isObject(),
    body('vehicleDetails.make').optional().isString().isLength({ min: 1, max: 100 }),
    body('vehicleDetails.model').optional().isString().isLength({ min: 1, max: 100 }),
    body('vehicleDetails.year').optional().isInt({ min: 1886, max: new Date().getFullYear() }),
    body('vehicleDetails.licensePlate').optional().isString().isLength({ min: 1, max: 15 }),
  ];
};

export const adminValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6, max: 100 }),
  ];
};

export const validate = (req: Request, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: ValidationError[]; }): any; new(): any; }; }; }, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export const userValidationSchema: Schema = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Name must be a string'
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Email must be valid'
  },
  dob: {
    in: ['body'],
    isDate: true,
    errorMessage: 'Date of Birth must be a valid date'
  },
  phoneNumber: {
    in: ['body'],
    isString: true,
    errorMessage: 'Phone number must be a string'
  }
};
