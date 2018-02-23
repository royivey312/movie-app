import { Injectable     } from '@angular/core';
import { Observable     } from 'rxjs/Observable';
import { of             } from 'rxjs/observable/of';

import { Movie          } from './movie';
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private moviesUrl = 'api/movies';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
  }

  getMovies(): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      tap(heroes => this.log('Fetched Movies')),
      catchError(this.handleError('getMovies', []))
    );

  }

  getMovie(id: number): Observable<Movie> {

    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(movie => this.log(`Fetched Movie id=${id}`)),
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
      tap(_ => this.log(`Found Movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

// CRUD Operations

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Movie id=${movie.id}`)),
      catchError(this.handleError<any>('UpdateMovie'))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions).pipe(
      tap((m: Movie) => this.log(`Added Movie w/ id=${m.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteHero'))
    );

  }


}
