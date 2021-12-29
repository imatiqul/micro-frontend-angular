import { TestBed } from '@angular/core/testing';

import { SnakeCaseInterceptor } from './snake-case.interceptor';

describe('SnakeCaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SnakeCaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SnakeCaseInterceptor = TestBed.inject(SnakeCaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
