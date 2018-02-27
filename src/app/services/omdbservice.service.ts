import {enableProdMode, Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Movie} from '../movie';
import {OmdbMovie} from '../omdbmovie';

@Injectable()
export class OmdbService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private accessKey = '6ebee51e';

  private log(message: string) {
    this.messageService.add(`OMDBService: ${message}`);
  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  private getReqUrlBase(): string {
    return `http://www.omdbapi.com/`;
  }

  getMovieByTitle(title: string): Observable<HttpResponse<OmdbMovie>> {
    const movieTitle = encodeURI(title);

    const url = this.getReqUrlBase();
    const req = new HttpRequest(
      'GET', url,
      {params: new HttpParams().set('apikey', this.accessKey)
                                   .set('t', title)
      });


    return this.http.request(req).pipe(
      tap(res => { if (res) { this.log(`Fetched ${title} from OMDB`); } } ),
      catchError(this.handleError<any>(`getMovieByTitle title=${movieTitle}`))
    );

  }




}
