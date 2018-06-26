import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptorsService } from './token-interceptors.service';

describe('TokenInterceptorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptorsService]
    });
  });

  it('should be created', inject([TokenInterceptorsService], (service: TokenInterceptorsService) => {
    expect(service).toBeTruthy();
  }));
});
