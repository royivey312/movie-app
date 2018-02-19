import { Injectable     } from '@angular/core';
import { Observable     } from 'rxjs/Observable';
import { of             } from 'rxjs/observable/of';

import { Movie          } from './movie';
import { MOVIES         } from './mock-movies';
import { MessageService } from './message.service';

@Injectable()
export class MovieService {

  constructor(private messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {
    this.messageService.add('MovieService: Fetched Movies');
    return of(MOVIES);
  }

  getMovie(id: number): Observable<Movie> {
    this.messageService.add(`HeroService: Fetched Movie id=${id}`);
    return of(MOVIES.find(movie => movie.id === id));
  }
}
