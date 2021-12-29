import { TestBed } from '@angular/core/testing';

import { ClientIdInterceptor } from './client-id.interceptor';

describe('ClientIdInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ClientIdInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ClientIdInterceptor = TestBed.inject(ClientIdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
