import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../../movie';
import {MovieService} from '../../services/movie.service';
import {Subject} from 'rxjs/Subject';
import {switchMap, distinctUntilChanged, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term))
    );
  }

}
