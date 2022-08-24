import { GoalsMatches } from './Matches';

export interface IMatcheservice<T>{
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>
  getByProgress(inProgress: boolean): Promise<T[]>
  updateProgress(id: number, finish: boolean): Promise<void>
  updateGoals(id: number, data: GoalsMatches): Promise<void>
}
