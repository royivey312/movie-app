import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../../movie';
import {MovieService} from '../../services/movie.service';
import {Subject} from 'rxjs/Subject';
import {switchMap, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {OMDBSearchResults, OmdbService} from '../../services/omdbservice.service';
import {OmdbMovie} from '../../omdbmovie';
import {HttpResponse} from '@angular/common/http';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies: OmdbMovie[];
  private searchTerms = new Subject<string>();

  constructor(private omdbMovieService: OmdbService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.omdbMovieService.searchMovieByTitle(term))
    ).subscribe(
      res => {

        if (res.body) {
          const searchres: OMDBSearchResults = res.body;
          this.movies = searchres.Search;
        }

      });
  }

}


