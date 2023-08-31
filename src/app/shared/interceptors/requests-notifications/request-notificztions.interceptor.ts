import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationsService } from '@shared/services/notifications/notifications.service';

@Injectable()
export class RequestNotificztionsInterceptor implements HttpInterceptor {
  constructor(private notificationsService: NotificationsService) {}

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        this.notificationsService.handleErrorResponse(response);
        return throwError(response);
      }),
    );
  }
}
