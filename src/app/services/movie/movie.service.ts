import { Injectable     } from '@angular/core';
import { Observable     } from 'rxjs/Observable';
import { of             } from 'rxjs/observable/of';

import { Movie          } from '../../domainobjs/movie';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import {OmdbMovie} from '../../domainobjs/omdbmovie';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  static MOVIES: Movie[] = [
    {id: 0, title: 'Star Wars: Episode IV - A New Hope' , imdbID: 'tt0076759'},
    {id: 1, title: 'The Thing' , imdbID: 'tt0084787'},
    {id: 2, title: 'Ex Machina', imdbID: 'tt0470752'},
    {id: 3, title: 'Deadpool'  , imdbID: 'tt1431045'},
    {id: 4, title: 'The Game'  , imdbID: 'tt0119174'}
  ];

  static idctr = 5;


  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
  }

  getMovies(): Observable<Movie[]> {
    return of(MovieService.MOVIES);
  }

  getMovie(id: number): Observable<Movie> {
    return of(MovieService.MOVIES.find(m => m.id === id));
  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${method} failed: ${error.message}`);

      return of(result as T);
    };
  }

// CRUD Operations

  addMovie(movie: OmdbMovie): Observable<Movie> {
    const mov    = { id: 0, title: movie.Title, imdbID: movie.imdbID };
          mov.id = MovieService.idctr++;

    MovieService.MOVIES.push(mov);
    return of(mov);
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    const imdbID = movie.imdbID;
    const index  = MovieService.MOVIES.findIndex(m => m.imdbID === imdbID);

    MovieService.MOVIES.splice(index, 1);
    return of({id: 0, title: 'DELETED', imdbID: ''});
  }

}
