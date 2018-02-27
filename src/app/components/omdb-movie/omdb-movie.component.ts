import {Component, Input, OnInit} from '@angular/core';
import {OmdbMovie} from '../../omdbmovie';
import {OmdbService} from '../../services/omdbservice.service';
import {tap} from 'rxjs/operators';
import {ConstMoviesService} from '../../services/const-movies.service';

@Component({
  selector: 'app-omdb-movie',
  templateUrl: './omdb-movie.component.html',
  styleUrls: ['./omdb-movie.component.css']
})
export class OmdbMovieComponent implements OnInit {

  @Input() title: string;
  movie: OmdbMovie;

  constructor(
    private omdbService: OmdbService) { }

  ngOnInit() {

    this.omdbService.getMovieByTitle(this.title)
      .subscribe(
        m => this.movie = m.body
    );
  }

}
