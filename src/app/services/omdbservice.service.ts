import {enableProdMode, Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Movie} from '../movie';

@Injectable()
export class OmdbService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private accessKey = '6ebee51e';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private log(message: string) {
    this.messageService.add(`OMDBService: ${message}`);
  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${method} failed ${error.message}`);

      return of(result as T);
    };
  }

  private getReqUrlBase(): string {
    return `http://www.omdbapi.com/`;
  }

  getMovieMovieByTitle(title: string): Observable<any> {
    const movieTitle = encodeURI(title);

    const url = this.getReqUrlBase();
    const req = new HttpRequest(
      'GET', url, this.httpOptions,
      {params: new HttpParams().set('apikey', this.accessKey)
                                   .set('t', title)
      });

    console.log(req);

    return this.http.request(req).pipe(
      tap(() => this.log(`Fetched ${title} from OMDB`)),
      catchError(this.handleError<any>(`getMovieByTitle title=${movieTitle}`))
    );
  }




}
