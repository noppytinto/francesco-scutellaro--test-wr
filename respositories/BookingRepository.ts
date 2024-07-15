import type {
  APIBooking,
  Booking,
  PaymentMethod,
} from "~/entities/booking/types";
import { TravelRepository } from "~/respositories/TravelRepository";
import type { IRepositoryAsync } from "~/respositories/IRepositoryAsync";
import {
  parseToCustomer,
  writeToCustomerAPI,
} from "~/respositories/CustomerRepository";

export class BookingRepository implements IRepositoryAsync<Booking> {
  async getAll() {
    const data = await $fetch<APIBooking[]>("/api/bookings");
    return await Promise.all(data.map(parseToBooking));
  }

  async getById(id: string) {
    const data = await $fetch<APIBooking>(`/api/bookings/${id}`);
    return parseToBooking(data);
  }

  async create(value: Booking) {
    const valueToWrite = writeToBookingAPI(value);
    const data = await $fetch<APIBooking>("/api/bookings", {
      method: "POST",
      body: valueToWrite,
    });

    return parseToBooking(data);
  }

  async update(id: string, value: Booking) {
    const valueToWrite = writeToBookingAPI(value);
    const data = await $fetch<APIBooking>(`/api/bookings/${id}`, {
      method: "PUT",
      body: valueToWrite,
    });

    return parseToBooking(data);
  }

  async delete(id: string) {
    await $fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });
  }
}

async function parseToBooking(data: APIBooking): Promise<Booking> {
  const travelRepo = new TravelRepository();
  const travel = await travelRepo.getById(data.travel_id);

  return {
    id: data.id,
    travel,
    customer: parseToCustomer(data.customer),
    paymentMethod: data.payment_method as PaymentMethod,
    internalNotes: data.internal_notes,
  };
}

function writeToBookingAPI(booking: Booking): APIBooking {
  return {
    id: booking.id,
    travel_id: booking.travel.id,
    customer: writeToCustomerAPI(booking.customer),
    payment_method: booking.paymentMethod,
    internal_notes: booking.internalNotes,
  };
}
