import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmdbMovieComponent } from './omdb-movie.component';

describe('OmdbMovieComponent', () => {
  let component: OmdbMovieComponent;
  let fixture: ComponentFixture<OmdbMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmdbMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmdbMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
