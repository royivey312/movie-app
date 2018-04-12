import { Injectable} from '@angular/core';
import {MessageService} from '../message/message.service';
import {HttpClient,  HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {OmdbMovie} from '../../domainobjs/omdbmovie';

@Injectable()
export class OmdbService {

  private omdbApiUrl = 'https://www.omdbapi.com/';

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

  getMovieByTitle(title: string): Observable<HttpResponse<OmdbMovie>> {
    const movieTitle = encodeURI(title);

    const url = this.omdbApiUrl;
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

  searchMovieByTitle(title: string): Observable<HttpResponse<OMDBSearchResults>> {
    const movieTitle = title;

    const url = this.omdbApiUrl;

    const req = new HttpRequest(
      'GET', url,
      {params: new HttpParams().set('apikey', this.accessKey)
                                   .set('s', movieTitle)}
    );

    return this.http.request(req).pipe(
      tap((res: HttpResponse<OMDBSearchResults>) => {
          if (res) {
            const result = res.body;
            this.log(`Fetched Movie Search for ${title} from OMDB {totalResults: ${result.totalResults}, response: ${result.Response}`);
          }
        }),
      catchError(this.handleError<any>(`searchMovieByTitle title=${title}`))
    );
  }

}

export class OMDBSearchResults {
  Search: OmdbMovie[];
  totalResults: string;
  Response: string;
}
