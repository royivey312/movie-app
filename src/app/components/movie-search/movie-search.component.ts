import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {switchMap, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {OMDBSearchResults, OmdbService} from '../../services/omdbservice/omdbservice.service';
import {OmdbMovie} from '../../domainobjs/omdbmovie';

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


