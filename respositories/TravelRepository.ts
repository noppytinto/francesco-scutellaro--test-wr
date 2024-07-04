import type { APITravel, Travel } from "~/entities/travel/types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEYS,
  type StorageKey,
} from "~/utils/localStorage";
import { getMockedTravelsData } from "~/server/mockedAPIData";
import type { IRepository } from "~/respositories/IRepository";

export class TravelRepository implements IRepository<Travel> {
  storageKey: StorageKey;

  constructor() {
    this.storageKey = STORAGE_KEYS.TRAVELS_DATA;
  }

  init() {
    if (!getFromLocalStorage(this.storageKey))
      saveToLocalStorage(STORAGE_KEYS.TRAVELS_DATA, getMockedTravelsData());
  }

  create(value: Travel) {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey);
    const bookings = data ? data.map(parseToTravel) : [];
    bookings.push(value);
    saveToLocalStorage(this.storageKey, bookings);
  }

  getAll() {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey);
    return data ? data.map(parseToTravel) : [];
  }

  getById(id: string) {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey);
    const bookings = data ? data.map(parseToTravel) : [];
    const result = bookings.find((booking) => booking.id === id);

    return result || null;
  }

  update(value: Travel) {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey);
    const bookings = data ? data.map(parseToTravel) : [];
    const index = bookings.findIndex((booking) => booking.id === value.id);

    if (index !== -1) {
      bookings[index] = value;
      saveToLocalStorage(this.storageKey, bookings);
    }
  }

  delete(id: string) {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey);
    const bookings = data ? data.map(parseToTravel) : [];
    const index = bookings.findIndex((booking) => booking.id === id);

    if (index !== -1) {
      bookings.splice(index, 1);
      saveToLocalStorage(this.storageKey, bookings);
    }
  }
}

export function parseToTravel(data: APITravel): Travel {
  return {
    id: data.id,
    name: data.name,
    thumbnailURL: data.thumbnail_url,
    description: data.description,
    departureDate: new Date(data.departure_date),
    returnDate: new Date(data.return_date),
    pricePerPerson: Number(data.price_per_person),
    averageRating: data.average_rating
      ? Number(data.average_rating)
      : undefined,
  };
}
