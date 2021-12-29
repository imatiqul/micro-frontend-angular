import { TestBed } from '@angular/core/testing';

import { AjaxBusyNotifierService } from './ajax-busy-notifier.service';

describe('AjaxBusyNotifierService', () => {
  let service: AjaxBusyNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxBusyNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
