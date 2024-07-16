import type { APITravel, Travel } from "~/entities/travel/types";
import type { IRepositoryAsync } from "~/respositories/IRepositoryAsync";
import { apiService } from "~/services/apiService";

export class TravelRepository implements IRepositoryAsync<Travel> {
  async getAll() {
    const data = await apiService.get<APITravel[]>("/api/travels");
    return data.map(parseToTravel);
  }

  async getById(id: string) {
    const data = await apiService.get<APITravel>(`/api/travels/${id}`);
    return parseToTravel(data);
  }

  async create(value: Travel) {
    const valueToWrite = writeToTravelAPI(value);
    const data = await apiService.post<APITravel>("/api/travels", valueToWrite);
    return parseToTravel(data);
  }

  async update(id: string, value: Travel) {
    const valueToWrite = writeToTravelAPI(value);
    const data = await apiService.put<APITravel>(
      `/api/travels/${id}`,
      valueToWrite,
    );

    return parseToTravel(data);
  }

  async delete(id: string) {
    await apiService.delete(`/api/travels/${id}`);
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
