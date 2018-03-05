import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../movie';
import {MovieService} from '../../services/movie.service';

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

  add(title: string): void {

    title = title.trim();

    if (!title) {
      return;
    }

    this.movieService.addMovie({title} as Movie).subscribe(
      movie => {
        if (!this.movies.find(m => m.title === title)) {
          this.movies.push(movie);
        }
      }
    );
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
