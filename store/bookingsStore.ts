import { defineStore } from "pinia";
import { BookingRepository } from "~/respositories/BookingRepository";
import type { Booking } from "~/entities/booking/types";

type State = {
  bookings: Booking[];
};

export const useBookingsStore = defineStore("bookings", {
  state: (): State => ({ bookings: [] }),
  actions: {
    async load() {
      const repo = new BookingRepository();
      this.bookings = await repo.getAll();
    },
    async reload() {
      await this.load();
    },
    async update(id: string, value: Booking) {
      const bookingsRepo = new BookingRepository();
      const updatedData = await bookingsRepo.update(id, value);
      const index = this.bookings.findIndex((v) => v.id === id);
      this.bookings[index] = updatedData;
    },
    async create(value: Booking) {
      console.log(
        "fffffffffffffffffffffffffffffffffffffffffff value.travel.id:",
        value.travel.id,
      );
      const repo = new BookingRepository();
      const createdData = await repo.create(value);
      this.bookings.push(createdData);
    },
    async delete(id: string) {
      const repo = new BookingRepository();
      await repo.delete(id);
      this.bookings = this.bookings.filter((v) => v.id !== id);
    },
  },
});
