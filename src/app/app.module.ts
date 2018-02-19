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


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    MovieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
