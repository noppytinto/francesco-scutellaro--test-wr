type Travel = {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  departureDate: Date;
  returnDate: Date;
};

const mockedTravels: Travel[] = [
  {
    id: "1",
    name: "Iceland",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of fire and ice",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "2",
    name: "Japan",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of the rising sun",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "3",
    name: "Australia",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land down under",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "4",
    name: "New Zealand",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of the long white cloud",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "5",
    name: "Canada",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The great white north",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "6",
    name: "South Africa",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The rainbow nation",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "7",
    name: "Brazil",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of samba and football",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "8",
    name: "Argentina",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of tango and steak",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "9",
    name: "Chile",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of poets and wine",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
  {
    id: "10",
    name: "Peru",
    thumbnail: "https://images.unsplash.com/photo-1552083375-1426b0f48b40",
    description: "The land of the Incas",
    departureDate: new Date("2021-10-01"),
    returnDate: new Date("2021-10-10"),
  },
];
