export interface IQRCode {
    code: string;
    owner: string;
    vehicleDetails?: {
      make: string;
      model: string;
      year: number;
      licensePlate: string;
    };
    images?: string[];
    emergencyContact?: Array<{
      name: string;
      phoneNumber: string;
    }>;
  }
  