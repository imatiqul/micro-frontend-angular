import { TestBed } from '@angular/core/testing';

import { RequestTimestampInterceptor } from './request-timestamp.interceptor';

describe('RequestTimestampInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestTimestampInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestTimestampInterceptor = TestBed.inject(RequestTimestampInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
