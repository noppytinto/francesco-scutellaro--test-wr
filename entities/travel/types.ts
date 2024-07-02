type APITravel = {
  id: string;
  name: string;
  thumbnail: string;
  description?: string;
  departure_date: string;
  return_date: string;
  price_per_person: string;
  average_rating?: string;
};

export type Travel = {
  id: string;
  name: string;
  thumbnail: string;
  description?: string;
  departureDate: Date;
  returnDate: Date;
  pricePerPerson: number;
  averageRating?: number;
};

export function parse(data: APITravel): Travel {
  return {
    id: data.id,
    name: data.name,
    thumbnail: data.thumbnail,
    description: data.description,
    departureDate: new Date(data.departure_date),
    returnDate: new Date(data.return_date),
    pricePerPerson: Number(data.price_per_person),
    averageRating: data.average_rating
      ? Number(data.average_rating)
      : undefined,
  };
}

export function getMockedTravels(): Travel[] {
  return mockedTravels.map(parse);
}

export const mockedTravels: APITravel[] = [
  {
    id: "1",
    name: "Iceland: waterfalls and volcanoes",
    thumbnail:
      "https://images.unsplash.com/photo-1621959721891-d297dfd9d6ee?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of fire and ice",
    departure_date: "2022-01-01",
    return_date: "2022-01-07",
    price_per_person: "1380",
  },
  {
    id: "2",
    name: "Japan: culture and tradition",
    thumbnail:
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the rising sun",
    departure_date: "2022-02-01",
    return_date: "2022-02-12",
    price_per_person: "2110",
  },
  {
    id: "3",
    name: "Brazil: beaches and carnival",
    thumbnail:
      "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the samba",
    departure_date: "2022-03-01",
    return_date: "2022-03-10",
    price_per_person: "950",
  },
  {
    id: "4",
    name: "Australia: kangaroos and koalas",
    thumbnail:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the kangaroo",
    departure_date: "2022-04-01",
    return_date: "2022-04-16",
    price_per_person: "1800",
  },
  {
    id: "5",
    name: "France: croissants and wine",
    thumbnail:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the croissant",
    departure_date: "2022-05-01",
    return_date: "2022-05-08",
    price_per_person: "1200",
  },
  {
    id: "6",
    name: "Germany: beer and sausages",
    thumbnail:
      "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the beer",
    departure_date: "2022-06-01",
    return_date: "2022-06-10",
    price_per_person: "1100",
  },
  {
    id: "7",
    name: "Italy: pizza and pasta",
    thumbnail:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the pizza",
    departure_date: "2022-07-01",
    return_date: "2022-07-11",
    price_per_person: "1300",
  },
  {
    id: "8",
    name: "Spain: paella and flamenco",
    thumbnail:
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the paella",
    departure_date: "2022-08-01",
    return_date: "2022-08-07",
    price_per_person: "1000",
  },
  {
    id: "9",
    name: "Portugal: fado and pastéis de nata",
    thumbnail:
      "https://images.unsplash.com/photo-1529699074188-d1fb8244c4ca?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the fado",
    departure_date: "2022-09-01",
    return_date: "2022-09-10",
    price_per_person: "950",
  },
  {
    id: "10",
    name: "Argentina: tango and asado",
    thumbnail:
      "https://images.unsplash.com/photo-1612900538226-0e2140aa02f6?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The land of the tango",
    departure_date: "2022-10-01",
    return_date: "2022-10-14",
    price_per_person: "1200",
  },
];
