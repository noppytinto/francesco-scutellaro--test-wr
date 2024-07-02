type APIUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  age: number;
  gender: UserGender;
  profile_picture: string;
};

type UserGender =
  | "man"
  | "woman"
  | "non-binary"
  | "other"
  | "prefer not to say";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: UserGender;
  profilePicture: string;
};

export function parse(data: APIUser): User {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    age: Number(data.age),
    gender: data.gender as UserGender,
    profilePicture: data.profile_picture,
  };
}

export function getMockedUsers(): User[] {
  return mockedUsers.map(parse);
}

const mockedUsers: APIUser[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@mail.com",
    phone_number: "123456789",
    age: 30,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@mail.com",
    phone_number: "987654321",
    age: 28,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@mail.com",
    phone_number: "234567891",
    age: 35,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    first_name: "Emily",
    last_name: "Davis",
    email: "emily.davis@mail.com",
    phone_number: "345678912",
    age: 32,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "5",
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@mail.com",
    phone_number: "456789123",
    age: 29,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "6",
    first_name: "Sarah",
    last_name: "Wilson",
    email: "sarah.wilson@mail.com",
    phone_number: "567891234",
    age: 27,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "7",
    first_name: "Chris",
    last_name: "Martinez",
    email: "chris.martinez@mail.com",
    phone_number: "678912345",
    age: 33,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "8",
    first_name: "Laura",
    last_name: "Garcia",
    email: "laura.garcia@mail.com",
    phone_number: "789123456",
    age: 31,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "9",
    first_name: "James",
    last_name: "Rodriguez",
    email: "james.rodriguez@mail.com",
    phone_number: "891234567",
    age: 36,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "10",
    first_name: "Olivia",
    last_name: "Hernandez",
    email: "olivia.hernandez@mail.com",
    phone_number: "912345678",
    age: 26,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];
