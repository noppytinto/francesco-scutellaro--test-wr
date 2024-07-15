import { APITravel } from "~/entities/travel/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const config = useRuntimeConfig();

  return await $fetch<APITravel[]>(`${config.apiBaseUrl}/travels/${id}`);
});
