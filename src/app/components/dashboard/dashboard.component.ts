import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {Movie} from '../../domainobjs/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies.filter(m => typeof m !== 'undefined').slice(0, 5));
  }

  updatedMovies(): Movie[] {
    for (const m in this.movies) {
      if (!m) {
        this.getMovies();
        break;
      }
    }

    return this.movies;
  }

}
