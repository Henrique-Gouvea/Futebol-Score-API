export interface ILearderboardService<T>{
  getMatchersFinished() : Promise<T[]>
}
