export interface ITeamService<T>{
  getAll(): Promise<T[]>
  getById(id: number): Promise<T | null>
}
