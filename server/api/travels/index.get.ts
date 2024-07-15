import { APITravel } from "~/entities/travel/types";

export default defineEventHandler(async (_event) => {
  const baseUrl = process.env.API_BASE_URL;
  return await $fetch<APITravel[]>(baseUrl + "/travels");
});
