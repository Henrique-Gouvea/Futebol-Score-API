export default class HandleError extends Error {
  public name: string;
  public message: string;

  constructor(name: string, message:string) {
    super();
    this.name = name;
    this.message = message;
  }
}
