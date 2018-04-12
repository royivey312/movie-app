import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent      } from './components/movies/movies.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {UserMoviesComponent} from './components/user-movies/user-movies.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'movies/user', component: UserMoviesComponent},
  {path: 'movies/search', component: MoviesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:title', component: MovieDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
