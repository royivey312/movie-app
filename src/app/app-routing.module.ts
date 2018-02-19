import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent      } from './movies/movies.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './movie-detail/movie-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'movies', component: MoviesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
