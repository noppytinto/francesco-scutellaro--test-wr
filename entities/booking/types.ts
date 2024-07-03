import type { Travel } from "~/entities/travel/types";
import type { User } from "~/entities/user/types";
import { getMockedUsers } from "~/entities/user/types";
import { getMockedTravels } from "~/entities/travel/types";

export type PaymentMethod = "Credit transfer" | "Paypal" | "Revolut";

type APIBooking = {
  id: string;
  travel_id: string;
  customer_id: string;
  payment_method: PaymentMethod;
  internal_notes?: string;
};

export type Booking = {
  id: string;
  travel: Travel;
  customer: User;
  paymentMethod: PaymentMethod;
  internalNotes?: string;
};

export function parse(
  data: APIBooking,
  travel: Travel,
  customer: User,
): Booking {
  return {
    id: data.id,
    travel,
    customer,
    paymentMethod: data.payment_method as PaymentMethod,
    internalNotes: data.internal_notes,
  };
}

export function getMockedBookings(): Booking[] {
  const mockedUsers = getMockedUsers();
  const travels = getMockedTravels();

  return mockedBookings.map((booking) =>
    parse(
      booking,
      travels.find((travel) => travel.id === booking.travel_id)!,
      mockedUsers.find((customer) => customer.id === booking.customer_id)!,
    ),
  );
}

const mockedBookings: APIBooking[] = [
  {
    id: "1",
    travel_id: "8",
    customer_id: "1",
    payment_method: "Credit transfer",
    internal_notes: "No allergies",
  },
  {
    id: "2",
    travel_id: "2",
    customer_id: "8",
    payment_method: "Paypal",
  },
  {
    id: "3",
    travel_id: "1",
    customer_id: "2",
    payment_method: "Revolut",
    internal_notes: "Vegetarian",
  },
  {
    id: "4",
    travel_id: "7",
    customer_id: "4",
    payment_method: "Credit transfer",
  },
  {
    id: "5",
    travel_id: "5",
    customer_id: "9",
    payment_method: "Paypal",
  },
  {
    id: "6",
    travel_id: "2",
    customer_id: "10",
    payment_method: "Credit transfer",
  },
  {
    id: "7",
    travel_id: "7",
    customer_id: "11",
    payment_method: "Paypal",
  },
  {
    id: "8",
    travel_id: "10",
    customer_id: "12",
    payment_method: "Revolut",
  },
  {
    id: "9",
    travel_id: "1",
    customer_id: "13",
    payment_method: "Revolut",
  },
  {
    id: "10",
    travel_id: "4",
    customer_id: "14",
    payment_method: "Paypal",
  },
  {
    id: "11",
    travel_id: "12",
    customer_id: "15",
    payment_method: "Revolut",
  },
  {
    id: "12",
    travel_id: "14",
    customer_id: "16",
    payment_method: "Credit transfer",
  },
  {
    id: "13",
    travel_id: "15",
    customer_id: "17",
    payment_method: "Credit transfer",
  },
  {
    id: "14",
    travel_id: "10",
    customer_id: "18",
    payment_method: "Revolut",
  },
  {
    id: "15",
    travel_id: "20",
    customer_id: "19",
    payment_method: "Credit transfer",
  },
];
