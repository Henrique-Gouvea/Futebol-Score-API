export interface ILearderboardService<T>{
  getClassification(homeOrAway:string) : Promise<T[]>
}
