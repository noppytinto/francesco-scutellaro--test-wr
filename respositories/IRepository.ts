export interface IRepository<T> {
  init(): void;
  create(value: T): void;
  getById(id: string): T | null;
  getAll(): T[];
  update(value: T): void;
  delete(id: string): void;
}
