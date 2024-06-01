export interface IUser {
    phoneNumber: string;
    name?: string;
    email?: string;
    dob?: Date;
    emergencyContacts?: Array<{
      name: string;
      phoneNumber: string;
    }>;
  }
  