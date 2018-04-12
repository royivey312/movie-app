import {Component, Input, OnInit} from '@angular/core';
import {OmdbMovie} from '../../domainobjs/omdbmovie';
import {OmdbService} from '../../services/omdbservice/omdbservice.service';
import {MovieService} from '../../services/movie/movie.service';
import {Movie} from '../../domainobjs/movie';

@Component({
  selector: 'app-omdb-movie',
  templateUrl: './omdb-movie.component.html',
  styleUrls: ['./omdb-movie.component.css']
})
export class OmdbMovieComponent implements OnInit {

  @Input() title: string;
  @Input() movie: OmdbMovie;
  inCollection: boolean;

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
            this.inCollection = this.movieInCollection();
          }
        }

      );
  }

  private movieInCollection(): boolean {
    const collection = MovieService.MOVIES;

    if (collection.find(m => m.imdbID === this.movie.imdbID)) {
      return true;
    } else {
      return false;
    }
  }

  addMovie() {
    this.movieService.addMovie(this.movie);
    this.inCollection = true;
  }

  deleteMovie() {
    this.movieService.deleteMovie( { imdbID: this.movie.imdbID } as Movie );
    this.inCollection = false;
  }

}
