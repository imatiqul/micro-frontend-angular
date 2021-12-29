import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestTimestampInterceptor } from './request-timestamp.interceptor';
import { ErrorNotifierInterceptor } from './error-notifier.interceptor';
import { AjaxBusyIdentifierInterceptor } from './ajax-busy-identifier.interceptor';
import { CachingInterceptor } from './caching.interceptor';
import { BasicInterceptor } from './basic.interceptor';
import { EnsureHttpsInterceptor } from './ensure-https.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { ServerLocationInterceptor } from './server-location.interceptor';
import { ApiLocationInterceptor } from './api-location.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { CamelCaseInterceptor } from './camel-case.interceptor';
import { SnakeCaseInterceptor } from './snake-case.interceptor';
import { ClientIdInterceptor } from './client-id.interceptor';
import { RetryInterceptor } from './retry.interceptor';

export const httpInterceptorProviders =
    [
        { provide: HTTP_INTERCEPTORS, useClass: RequestTimestampInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AjaxBusyIdentifierInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ServerLocationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ApiLocationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ClientIdInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SnakeCaseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SnakeCaseInterceptor, multi: true }
    ];
