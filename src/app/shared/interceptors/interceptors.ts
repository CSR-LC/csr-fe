import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor/auth-interceptor';
import { UrlInterceptor } from '@shared/interceptors/url-interceptor/url-interceptor';
import { RequestNotificationsInterceptor } from '@shared/interceptors/requests-notifications/request-notificztions.interceptor';

export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestNotificationsInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  // keep UrlInterceptor after AuthInterceptor
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlInterceptor,
    multi: true,
  },
];
