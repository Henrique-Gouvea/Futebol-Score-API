export interface IMatcheservice<T>{
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>
  getByProgress(): Promise<T[]>
}
