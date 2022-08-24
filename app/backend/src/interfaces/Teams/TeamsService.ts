export interface ITeamService<T>{
  getAll(): Promise<T[]>
}
