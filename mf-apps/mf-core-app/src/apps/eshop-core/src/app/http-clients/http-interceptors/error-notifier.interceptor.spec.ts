import { TestBed } from '@angular/core/testing';

import { ErrorNotifierInterceptor } from './error-notifier.interceptor';

describe('ErrorNotifierInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorNotifierInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorNotifierInterceptor = TestBed.inject(ErrorNotifierInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
