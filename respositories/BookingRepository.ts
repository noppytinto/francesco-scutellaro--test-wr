import type {
  APIBooking,
  Booking,
  PaymentMethod,
} from "~/entities/booking/types";
import {
  parseToCustomer,
  writeToCustomerAPI,
} from "~/respositories/CustomerRepository";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEYS,
  type StorageKey,
} from "~/utils/localStorage";
import type { IRepository } from "~/respositories/IRepository";
import { getBookingsResponseData } from "~/server/mockedAPIData";
import {
  parseToTravel,
  writeToTravelAPI,
} from "~/respositories/TravelRepository";

export class BookingRepository implements IRepository<Booking> {
  storageKey: StorageKey;

  constructor() {
    this.storageKey = STORAGE_KEYS.BOOKINGS_DATA;
  }

  init() {
    if (!getFromLocalStorage(this.storageKey)) {
      saveToLocalStorage(this.storageKey, getBookingsResponseData());
    }
  }

  getAll() {
    const data = getFromLocalStorage<APIBooking[]>(this.storageKey) || [];
    return data.map(parseToBooking);
  }

  getById(id: string) {
    const allData = getFromLocalStorage<APIBooking[]>(this.storageKey) || [];
    const parsedData = allData.map(parseToBooking);
    const result = parsedData.find((d) => d.id === id);
    return result || null;
  }

  create(value: Booking) {
    const valueToWrite = writeToBookingAPI(value);
    const allData = getFromLocalStorage<APIBooking[]>(this.storageKey) || [];
    allData.push(valueToWrite);
    saveToLocalStorage(this.storageKey, allData);
  }

  update(value: Booking) {
    const allData = getFromLocalStorage<APIBooking[]>(this.storageKey) || [];
    const index = allData.findIndex((d) => d.id === value.id);

    if (index !== -1) {
      allData[index] = writeToBookingAPI(value);
      saveToLocalStorage(this.storageKey, allData);
    }
  }

  delete(id: string) {
    const allData = getFromLocalStorage<APIBooking[]>(this.storageKey) || [];
    const index = allData.findIndex((d) => d.id === id);

    if (index !== -1) {
      allData.splice(index, 1);
      saveToLocalStorage(this.storageKey, allData);
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

function writeToBookingAPI(booking: Booking): APIBooking {
  return {
    id: booking.id,
    travel: writeToTravelAPI(booking.travel),
    customer: writeToCustomerAPI(booking.customer),
    payment_method: booking.paymentMethod,
    internal_notes: booking.internalNotes,
  };
}
