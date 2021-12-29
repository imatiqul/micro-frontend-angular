import { TestBed } from '@angular/core/testing';

import { CamelCaseInterceptor } from './camel-case.interceptor';

describe('CamelCaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CamelCaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CamelCaseInterceptor = TestBed.inject(CamelCaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
