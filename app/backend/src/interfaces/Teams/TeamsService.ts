import { ITeam } from './Teams';

export interface ITeamService<T>{
  getAll(): Promise<T[]>
  getById(id: number): Promise<ITeam> | undefined
}
