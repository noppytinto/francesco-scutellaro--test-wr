// you can replace it with any type of fetch lib
// e.g. axios, native fetch, ...
export const apiService = {
  async get<T>(url: string) {
    return await $fetch<T>(url);
  },
  async post<T>(url: string, body: any) {
    return await $fetch<T>(url, { method: "POST", body });
  },
  async put<T>(url: string, body: any) {
    return await $fetch<T>(url, { method: "PUT", body });
  },
  async delete<T>(url: string) {
    return await $fetch<T>(url, { method: "DELETE" });
  },
};
