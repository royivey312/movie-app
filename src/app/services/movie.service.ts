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
    {id: 0, title: 'Star Wars'},
    {id: 1, title: 'The Thing'   },
    {id: 2, title: 'Ex Machina'  },
    {id: 3, title: 'Deadpool'},
    {id: 4, title: 'The Game'}
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

  updateMovie(movie: Movie): Observable<any> {
    const mov = this.MOVIES.find(m => m.id === movie.id );
          mov.title = movie.title;
    return of(mov);
  }

  addMovie(movie: Movie): Observable<Movie> {
    const mov = {id: this.idctr++, title: movie.title};
    this.MOVIES.push(mov);
    return of(mov);
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id    = typeof movie === 'number' ? movie : movie.id;
    const index = this.MOVIES.findIndex(m => m.id === id);

    delete this.MOVIES[index];
    return of({id: id, title: 'DELETED'});
  }

}
