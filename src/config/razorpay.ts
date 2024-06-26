// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';

// dotenv.config();

// const razorpay = new Razorpay ({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default razorpay;

import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

if (!razorpayKeyId) {
    throw new Error('RAZORPAY_KEY_ID must be defined');
}

const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;