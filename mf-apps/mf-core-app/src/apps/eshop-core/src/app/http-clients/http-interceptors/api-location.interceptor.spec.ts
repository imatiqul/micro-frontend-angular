import { TestBed } from '@angular/core/testing';

import { ApiLocationInterceptor } from './api-location.interceptor';

describe('ApiLocationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiLocationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiLocationInterceptor = TestBed.inject(ApiLocationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
