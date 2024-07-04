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

export const USER_GENDER = {
  man: "man",
  woman: "woman",
  nonBinary: "non-binary",
  other: "other",
  preferNotToSay: "prefer not to say",
} as const;

export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

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
