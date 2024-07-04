import type {
  APICustomer,
  Customer,
  UserGender,
} from "~/entities/customer/types";

class CustomerRepository {}

export function parseToCustomer(data: APICustomer): Customer {
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

export function writeToCustomerAPI(data: Customer): APICustomer {
  return {
    id: data.id,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phoneNumber,
    age: data.age,
    gender: data.gender,
    profile_picture: data.profilePicture,
  };
}
