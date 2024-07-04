export type APICustomer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  age: number;
  gender: UserGender;
  profile_picture: string;
};

export type UserGender =
  | "man"
  | "woman"
  | "non-binary"
  | "other"
  | "prefer not to say";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: UserGender;
  profilePicture: string;
};
