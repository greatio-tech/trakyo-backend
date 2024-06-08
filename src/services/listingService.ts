import QRCode from '../models/qrCodeModel';

export const listQRCodes = async () => {
  const qrCodes = await QRCode.find();
  return qrCodes;
};
