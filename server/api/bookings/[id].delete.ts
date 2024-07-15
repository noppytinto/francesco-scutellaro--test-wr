import { APITravel } from "~/entities/travel/types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  return await $fetch<APITravel[]>(`${config.apiBaseUrl}/bookings/${id}`, {
    method: "DELETE",
  });
});
