export interface IUser {
    phoneNumber: string;
    name?: string;
    email?: string;
    dob?: Date;
    profilePicture?: string;
    id:number;
    emergencyContacts?: Array<{
      name: string;
      phoneNumber: string;
    }>;
  }
  