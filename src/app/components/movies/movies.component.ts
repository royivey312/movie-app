import { Component, OnInit } from '@angular/core';

import { Movie             } from '../../movie';
import { MovieService      } from '../../services/movie.service';
import { OmdbService       } from '../../services/omdbservice.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  OMDBMovie: any;

  getOMDBMovie() {
    this.omdbService.getMovieMovieByTitle('Aliens').subscribe(r => this.OMDBMovie = r );
  }

  constructor(
    private movieService: MovieService,
    private omdbService: OmdbService) { }

  ngOnInit() {
    this.getMovies();
    this.getOMDBMovie();

  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.movieService.addMovie({ title } as Movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
