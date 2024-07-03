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
  {
    id: "11",
    first_name: "Liam",
    last_name: "Wilson",
    email: "liam.wilson@mail.com",
    phone_number: "913456789",
    age: 28,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "12",
    first_name: "Emma",
    last_name: "Johnson",
    email: "emma.johnson@mail.com",
    phone_number: "914567890",
    age: 22,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: "13",
    first_name: "Noah",
    last_name: "Brown",
    email: "noah.brown@mail.com",
    phone_number: "915678901",
    age: 30,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: "14",
    first_name: "Sophia",
    last_name: "Jones",
    email: "sophia.jones@mail.com",
    phone_number: "916789012",
    age: 24,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: "15",
    first_name: "James",
    last_name: "Garcia",
    email: "james.garcia@mail.com",
    phone_number: "917890123",
    age: 27,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: "16",
    first_name: "Isabella",
    last_name: "Martinez",
    email: "isabella.martinez@mail.com",
    phone_number: "918901234",
    age: 23,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    id: "17",
    first_name: "Benjamin",
    last_name: "Rodriguez",
    email: "benjamin.rodriguez@mail.com",
    phone_number: "919012345",
    age: 29,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    id: "18",
    first_name: "Mia",
    last_name: "Miller",
    email: "mia.miller@mail.com",
    phone_number: "920123456",
    age: 25,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: "19",
    first_name: "Elijah",
    last_name: "Davis",
    email: "elijah.davis@mail.com",
    phone_number: "921234567",
    age: 31,
    gender: "man",
    profile_picture: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: "20",
    first_name: "Ava",
    last_name: "Martinez",
    email: "ava.martinez@mail.com",
    phone_number: "922345678",
    age: 26,
    gender: "woman",
    profile_picture: "https://randomuser.me/api/portraits/women/20.jpg",
  },
];
