import { Injectable     } from '@angular/core';
import { Observable     } from 'rxjs/Observable';
import { of             } from 'rxjs/observable/of';

import { Movie          } from '../movie';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  idctr = 3;

  MOVIES: Movie[] = [
    {id: 0, title: 'Annihilation'},
    {id: 1, title: 'The Thing'   },
    {id: 2, title: 'Ex Machina'  }
  ];

  private moviesUrl = 'api/movies';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
  }

  getMovies(): Observable<Movie[]> {
    return of(this.MOVIES);
  }

  getMovie(id: number): Observable<Movie> {
    return of(this.MOVIES.find(m => m.id === id));
  }

  getMovie_API(id: number): Observable<Movie> {

    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(() => this.log(`Fetched Movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );

  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${method} failed: ${error.message}`);

      return of(result as T);
    };
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not a search term
      return of([]);
    }

    return this.http.get<Movie[]>(`api/movies/?title=${term}`).pipe(
      tap(() => this.log(`Found Movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

// CRUD Operations

  updateMovie(movie: Movie): Observable<any>{
    const mov = this.MOVIES.find(m => m.id === movie.id )
          mov.title = movie.title;
    return of(mov);
  }

  updateMovie_API(movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, this.httpOptions).pipe(
      tap(() => this.log(`Updated Movie id=${movie.id}`)),
      catchError(this.handleError<any>('UpdateMovie'))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    const mov = {id: this.idctr++, title: movie.title};
    this.MOVIES.push(mov);
    return of(mov);
  }

  addMovie_API(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions).pipe(
      tap((m: Movie) => this.log(`Added Movie w/ id=${m.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id    = typeof movie === 'number' ? movie : movie.id;
    const index = this.MOVIES.findIndex(m => m.id === id);

    delete this.MOVIES[index];
    return of({id: id, title: 'DELETED'});
  }

  deleteMovie_API(movie: Movie | number): Observable<Movie> {
    const id  = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(() => this.log(`Deleted Movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteHero'))
    );

  }


}
