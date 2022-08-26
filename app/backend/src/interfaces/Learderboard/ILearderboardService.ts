export interface ILearderboardService<T>{
  getMatchersFinished(homeOrAway:string) : Promise<T[]>
}
