import type { APITravel, Travel } from "~/entities/travel/types";
import type { APICustomer, Customer } from "~/entities/customer/types";

export const PAYMENT_METHODS = {
  CREDIT_TRANSFER: "Credit transfer",
  PAYPAL: "Paypal",
  REVOLUT: "Revolut",
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

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
