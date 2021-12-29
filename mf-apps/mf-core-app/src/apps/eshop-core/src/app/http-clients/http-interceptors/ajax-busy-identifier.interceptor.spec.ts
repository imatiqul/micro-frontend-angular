import { TestBed } from '@angular/core/testing';

import { AjaxBusyIdentifierInterceptor } from './ajax-busy-identifier.interceptor';

describe('AjaxBusyIdentifierInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AjaxBusyIdentifierInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AjaxBusyIdentifierInterceptor = TestBed.inject(AjaxBusyIdentifierInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
