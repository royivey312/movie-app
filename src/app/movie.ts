export class Movie {
  id    : number;
  imdbID: string;
  title : string;

  constructor(id: number, imdbID: string, title: string) {
    this.id     = id;
    this.imdbID = imdbID;
    this.title  = title;
  }
}
