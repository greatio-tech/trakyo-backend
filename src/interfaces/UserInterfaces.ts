export interface IUser {
    phoneNumber: string;
    name?: string;
    email?: string;
    dob?: Date;
    id:number;
    emergencyContacts?: Array<{
      name: string;
      phoneNumber: string;
    }>;
  }
  