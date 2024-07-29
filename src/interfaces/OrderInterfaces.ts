// export interface IOrder {
//     user: string;
//     amount: number;
//     currency: string;
//     receipt: string;
//     status: string;
//     paymentId?: string;
//   }
  
export interface IOrder {
  user: string;
  qrCodes: string[];
  amount: number;
  currency: string;
  receipt: string;
  paymentId?: string;
  status: string;
  deliveryStatus: string;
  address_id:string;
}

