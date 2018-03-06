import {Component, Input, OnInit} from '@angular/core';
import {OmdbMovie} from '../../omdbmovie';
import {OmdbService} from '../../services/omdbservice.service';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../movie';

@Component({
  selector: 'app-omdb-movie',
  templateUrl: './omdb-movie.component.html',
  styleUrls: ['./omdb-movie.component.css']
})
export class OmdbMovieComponent implements OnInit {

  @Input() title: string;
  @Input() movie: OmdbMovie;
  @Input() add = false;

  constructor(
    private omdbService: OmdbService,
    private movieService: MovieService) { }

  ngOnInit() {
    const title: string = this.title ? this.title : this.movie.Title;

    this.omdbService.getMovieByTitle(title)
      .subscribe(
        m => {
          this.movie = m.body;
          if (this.movie) {
            // console.log(this.movie);
          }
        }

      );
  }

  addMovie() {
    this.movieService.addMovie(this.movie);
  }

  deleteMovie() {
    this.movieService.deleteMovie( { imdbID: this.movie.imdbID } as Movie );
  }

}
