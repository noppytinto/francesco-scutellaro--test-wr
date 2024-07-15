export interface IRepositoryAsync<T> {
  create(value: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, value: T): Promise<T>;
  delete(id: string): Promise<void>;
}
