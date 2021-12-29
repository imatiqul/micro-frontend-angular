import { TestBed } from '@angular/core/testing';

import { ServerLocationInterceptor } from './server-location.interceptor';

describe('ServerLocationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerLocationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerLocationInterceptor = TestBed.inject(ServerLocationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
