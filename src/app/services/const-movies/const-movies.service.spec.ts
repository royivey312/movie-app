import { TestBed, inject } from '@angular/core/testing';

import { ConstMoviesService } from './const-movies.service';

describe('ConstMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstMoviesService]
    });
  });

  it('should be created', inject([ConstMoviesService], (service: ConstMoviesService) => {
    expect(service).toBeTruthy();
  }));
});
