import type { APITravel, Travel } from "~/entities/travel/types";
import type { APICustomer, Customer } from "~/entities/customer/types";

export type PaymentMethod = "Credit transfer" | "Paypal" | "Revolut";

export type APIBooking = {
  id: string;
  travel: APITravel;
  customer: APICustomer;
  payment_method: PaymentMethod;
  internal_notes?: string;
};

export type Booking = {
  id: string;
  travel: Travel;
  customer: Customer;
  paymentMethod: PaymentMethod;
  internalNotes?: string;
};
