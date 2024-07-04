import type { APITravel, Travel } from "~/entities/travel/types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEYS,
  type StorageKey,
} from "~/utils/localStorage";
import { getTravelsResponseData } from "~/server/mockedAPIData";
import type { IRepository } from "~/respositories/IRepository";

export class TravelRepository implements IRepository<Travel> {
  storageKey: StorageKey;

  constructor() {
    this.storageKey = STORAGE_KEYS.TRAVELS_DATA;
  }

  init() {
    if (!getFromLocalStorage(this.storageKey)) {
      saveToLocalStorage(this.storageKey, getTravelsResponseData());
    }
  }

  getAll() {
    const data = getFromLocalStorage<APITravel[]>(this.storageKey) || [];
    return data.map(parseToTravel);
  }

  getById(id: string) {
    const allData = getFromLocalStorage<APITravel[]>(this.storageKey) || [];
    const parsedData = allData.map(parseToTravel);
    const result = parsedData.find((d) => d.id === id);
    return result || null;
  }

  create(value: Travel) {
    const valueToWrite = writeToTravelAPI(value);
    const allData = getFromLocalStorage<APITravel[]>(this.storageKey) || [];
    allData.push(valueToWrite);
    saveToLocalStorage(this.storageKey, allData);
  }

  update(value: Travel) {
    const allData = getFromLocalStorage<APITravel[]>(this.storageKey) || [];
    const index = allData.findIndex((d) => d.id === value.id);

    if (index !== -1) {
      allData[index] = writeToTravelAPI(value);
      saveToLocalStorage(this.storageKey, allData);
    }
  }

  delete(id: string) {
    const allData = getFromLocalStorage<APITravel[]>(this.storageKey) || [];
    const index = allData.findIndex((d) => d.id === id);

    if (index !== -1) {
      allData.splice(index, 1);
      saveToLocalStorage(this.storageKey, allData);
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

export function writeToTravelAPI(data: Travel): APITravel {
  return {
    id: data.id,
    name: data.name,
    thumbnail_url: data.thumbnailURL,
    description: data.description,
    departure_date: data.departureDate.toISOString(),
    return_date: data.returnDate.toISOString(),
    price_per_person: String(data.pricePerPerson),
    average_rating: data.averageRating ? String(data.averageRating) : undefined,
  };
}
