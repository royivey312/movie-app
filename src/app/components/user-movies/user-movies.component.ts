import {Component, OnInit} from '@angular/core';
import {Movie} from '../../domainobjs/movie';
import {MovieService} from '../../services/movie/movie.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css']
})
export class UserMoviesComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
