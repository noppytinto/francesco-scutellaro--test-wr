import { APITravel } from "~/entities/travel/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  return await $fetch<APITravel[]>(`${config.apiBaseUrl}/bookings`, {
    method: "POST",
    body,
  });
});
