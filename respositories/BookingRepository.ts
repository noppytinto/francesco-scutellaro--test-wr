import type {
  APIBooking,
  Booking,
  PaymentMethod,
} from "~/entities/booking/types";
import { parseToCustomer } from "~/respositories/CustomerRepository";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEYS,
  type StorageKey,
} from "~/utils/localStorage";
import type { IRepository } from "~/respositories/IRepository";
import { getMockedBookingsData } from "~/server/mockedAPIData";
import { parseToTravel } from "~/respositories/TravelRepository";

export class BookingRepository implements IRepository<Booking> {
  storageKey: StorageKey;

  constructor() {
    this.storageKey = STORAGE_KEYS.BOOKINGS_DATA;
  }

  init() {
    if (!getFromLocalStorage(this.storageKey))
      saveToLocalStorage(this.storageKey, getMockedBookingsData());
  }

  create(value: Booking) {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey);
    const bookings = data ? data.map(parseToBooking) : [];
    bookings.push(value);
    saveToLocalStorage(this.storageKey, bookings);
  }

  getAll() {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey);
    return data ? data.map(parseToBooking) : [];
  }

  getById(id: string) {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey);
    const bookings = data ? data.map(parseToBooking) : [];
    const result = bookings.find((booking) => booking.id === id);

    return result || null;
  }

  update(value: Booking) {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey);
    const bookings = data ? data.map(parseToBooking) : [];
    const index = bookings.findIndex((booking) => booking.id === value.id);

    if (index !== -1) {
      bookings[index] = value;
      saveToLocalStorage(this.storageKey, bookings);
    }
  }

  delete(id: string) {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey);
    const bookings = data ? data.map(parseToBooking) : [];
    const index = bookings.findIndex((booking) => booking.id === id);

    if (index !== -1) {
      bookings.splice(index, 1);
      saveToLocalStorage(this.storageKey, bookings);
    }
  }
}

function parseToBooking(data: APIBooking): Booking {
  return {
    id: data.id,
    travel: parseToTravel(data.travel),
    customer: parseToCustomer(data.customer),
    paymentMethod: data.payment_method as PaymentMethod,
    internalNotes: data.internal_notes,
  };
}
