export interface IQRCode {
    code: string;
    owner: string;
    vehicleDetails?: {
      make: string;
      model: string;
      year: number;
      licensePlate: string;
    };
  }
  