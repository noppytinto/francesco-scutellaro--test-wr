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
  {
    id: "11",
    name: "Greece: Santorini Sunsets",
    thumbnail:
      "https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience the stunning sunsets and crystal-clear waters.",
    departure_date: "2022-09-15",
    return_date: "2022-09-25",
    price_per_person: "1500",
  },
  {
    id: "12",
    name: "Switzerland: Alps and Zurich",
    thumbnail:
      "https://images.unsplash.com/photo-1517490560101-4ffe479ef5c3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Ski in the Swiss Alps and explore the charming city of Zurich.",
    departure_date: "2023-12-15",
    return_date: "2023-12-25",
    price_per_person: "2400",
  },
  {
    id: "13",
    name: "Iceland: Northern Lights",
    thumbnail:
      "https://images.unsplash.com/photo-1488703480497-dfcccd4894d1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Witness the spectacular Northern Lights and explore Iceland's unique landscapes.",
    departure_date: "2023-12-01",
    return_date: "2023-12-10",
    price_per_person: "2200",
  },
  {
    id: "14",
    name: "Australia: Surf and Outback",
    thumbnail:
      "https://images.unsplash.com/photo-1503022932596-500eb8cca2d8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Experience the vibrant city life and rugged outback adventures.",
    departure_date: "2023-02-10",
    return_date: "2023-02-25",
    price_per_person: "2000",
  },
  {
    id: "15",
    name: "Peru: Machu Picchu Expedition",
    thumbnail:
      "https://images.unsplash.com/photo-1532996152552-eaffc4edfc1a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Hike the Inca Trail and explore the ancient ruins of Machu Picchu.",
    departure_date: "2023-05-01",
    return_date: "2023-05-14",
    price_per_person: "1700",
  },
  {
    id: "16",
    name: "Morocco: Desert and Medina",
    thumbnail:
      "https://images.unsplash.com/photo-1451245420434-8f0ce5b89693?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Discover the vibrant markets and stunning desert landscapes.",
    departure_date: "2023-06-10",
    return_date: "2023-06-20",
    price_per_person: "1600",
  },
  {
    id: "17",
    name: "Canada: Rockies and Vancouver",
    thumbnail:
      "https://images.unsplash.com/photo-1536637706725-c96e8837df7d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Explore the breathtaking landscapes of the Rocky Mountains and the vibrant city of Vancouver.",
    departure_date: "2023-07-05",
    return_date: "2023-07-15",
    price_per_person: "1900",
  },
  {
    id: "18",
    name: "Thailand: Bangkok and Beaches",
    thumbnail:
      "https://images.unsplash.com/photo-1494949360228-4e9bde560065?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Immerse yourself in the vibrant culture and beautiful beaches of Thailand.",
    departure_date: "2023-01-10",
    return_date: "2023-01-25",
    price_per_person: "1300",
  },
  {
    id: "19",
    name: "Egypt: Pyramids and Nile Cruise",
    thumbnail:
      "https://images.unsplash.com/photo-1544815521-80841127c00f?q=80&w=2109&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Explore the ancient pyramids and cruise down the Nile River.",
    departure_date: "2023-11-10",
    return_date: "2023-11-20",
    price_per_person: "1800",
  },
  {
    id: "20",
    name: "New Zealand: Adventure and Nature",
    thumbnail:
      "https://images.unsplash.com/photo-1531804159968-24716780d214?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Experience the stunning natural landscapes and adventurous activities in New Zealand.",
    departure_date: "2023-09-01",
    return_date: "2023-09-15",
    price_per_person: "2100",
  },
];
