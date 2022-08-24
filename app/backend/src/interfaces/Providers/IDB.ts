export interface IDB <T>{
  getAll(model:T) : Promise<T[]>
  getById(id: number, model:T): Promise<T >
}
