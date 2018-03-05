import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent      } from './components/movies/movies.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HeroDetailComponent} from './components/movie-detail/movie-detail.component';
import {UserMoviesComponent} from './components/user-movies/user-movies.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'movies/user', component: UserMoviesComponent},
  {path: 'movies/search', component: MoviesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
