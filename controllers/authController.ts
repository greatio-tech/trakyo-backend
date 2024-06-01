import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/userModel';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '1h' },
      (err: any, token: any) => { 
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err: any) { 
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
import twilio from 'twilio';

// Initialize Twilio client
const client = twilio(accountSid , authToken);

export const sendOTP = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your OTP for login is: ${otp}`,
      to: phoneNumber,
      from: twilioNumber
    });

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '1h' },
      (err: any, token: any) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err: any) { 
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
