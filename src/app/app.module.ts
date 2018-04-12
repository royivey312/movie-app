import { BrowserModule                  } from '@angular/platform-browser';
import { NgModule                       } from '@angular/core';
import { FormsModule                    } from '@angular/forms';
import { HttpClientModule               } from '@angular/common/http';

import { AppComponent                   } from './app.component';
import { AppRoutingModule               } from './app-routing.module';

import { MovieService                   } from './services/movie/movie.service';
import { MessageService                 } from './services/message/message.service';
import { OmdbService                    } from './services/omdbservice/omdbservice.service';

import { MoviesComponent                } from './components/movies/movies.component';
import { HeroDetailComponent            } from './components/movie-detail/movie-detail.component';
import { MessagesComponent              } from './components/messages/messages.component';
import { DashboardComponent             } from './components/dashboard/dashboard.component';
import { MovieSearchComponent           } from './components/movie-search/movie-search.component';
import { NavBarComponent                } from './components/nav-bar/nav-bar.component';
import { OmdbMovieComponent } from './components/omdb-movie/omdb-movie.component';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar/dist/lib';
import { MainViewComponent } from './components/main-view/main-view.component';
import { OcticonDirective } from './directives/octicon/octicon.directive';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MovieSearchComponent,
    NavBarComponent,
    OmdbMovieComponent,
    MainViewComponent,
    OcticonDirective,
    UserMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MalihuScrollbarModule.forRoot()
  ],
  providers: [
    MovieService,
    OmdbService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
