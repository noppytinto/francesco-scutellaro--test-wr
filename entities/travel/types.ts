export type APITravel = {
  id: string;
  name: string;
  thumbnail_url: string;
  description?: string;
  departure_date: string;
  return_date: string;
  price_per_person: string;
  average_rating?: string;
};

export type Travel = {
  id: string;
  name: string;
  thumbnailURL: string;
  description?: string;
  departureDate: Date;
  returnDate: Date;
  pricePerPerson: number;
  averageRating?: number;
};
