import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Movie                    } from '../../domainobjs/movie';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {OmdbMovie} from '../../domainobjs/omdbmovie';
import {OmdbService} from '../../services/omdbservice/omdbservice.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  omovie: OmdbMovie;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private omdbService: OmdbService,
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const title = this.route.snapshot.paramMap.get('title');
    this.omdbService.getMovieByTitle(title)
      .subscribe(movie => this.omovie = movie.body);
  }

  goBack(): void {
    this.location.back();
  }

}
