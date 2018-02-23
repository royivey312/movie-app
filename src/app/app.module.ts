import { BrowserModule       } from '@angular/platform-browser';
import { NgModule            } from '@angular/core';
import { FormsModule         } from '@angular/forms';

import { AppComponent        } from './app.component';
import { MoviesComponent     } from './movies/movies.component';
import { HeroDetailComponent } from './movie-detail/movie-detail.component';
import { MovieService        } from './movie.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {MovieSearchComponent} from './movie-search/movie-search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MovieSearchComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    MovieService,
    MessageService,
    InMemoryDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
