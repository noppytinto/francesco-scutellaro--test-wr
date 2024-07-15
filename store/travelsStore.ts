import { defineStore } from "pinia";
import type { Travel } from "~/entities/travel/types";
import { TravelRepository } from "~/respositories/TravelRepository";

type State = {
  travels: Travel[];
};

export const useTravelsStore = defineStore("travels", {
  state: (): State => ({ travels: [] }),
  actions: {
    async load() {
      const repo = new TravelRepository();
      this.travels = await repo.getAll();
    },
    async reload() {
      await this.load();
    },
    async update(id: string, value: Travel) {
      const repo = new TravelRepository();
      const updatedData = await repo.update(id, value);
      const index = this.travels.findIndex((v) => v.id === id);
      this.travels[index] = updatedData;
    },
    async create(value: Travel) {
      const repo = new TravelRepository();
      const createdData = await repo.create(value);
      this.travels.push(createdData);
    },
    async delete(id: string) {
      const repo = new TravelRepository();
      await repo.delete(id);
      this.travels = this.travels.filter((travel) => travel.id !== id);
    },
  },
});
