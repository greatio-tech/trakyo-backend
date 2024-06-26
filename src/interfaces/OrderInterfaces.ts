export interface IOrder {
    user: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    paymentId?: string;
  }
  