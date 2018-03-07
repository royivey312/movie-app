import {Component, Input, OnInit} from '@angular/core';

import { Movie             } from '../../movie';
import {OmdbMovie} from '../../omdbmovie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input () OmdbMovies: OmdbMovie[];
  @Input () movies    : Movie[];

  constructor() { }

  ngOnInit() {
  }
}
