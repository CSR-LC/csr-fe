import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, filter, Observable, switchMap, take, tap, throwError} from "rxjs";
import { AuthService } from "../../services/auth-service/auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isRequestNeedsTokens(request.url)) {
      request = this.addTokenHeader(request);
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        const err = response.error;
        // TODO: fix when back stop sending 500 response
        if (err.code === 401 || err?.code === 500 && err.message === 'Token is expired' ) {
          return this.handle401Error(request, next);
        }
        return throwError(response);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const token = this.authService.getRefreshToken();
      if (token) {
        this.refreshToken(token).subscribe();
      } else {
        this.authService.logout();
      }
    }

    return this.refreshToken$.pipe(
      filter(token => token),
      take(1),
      switchMap((token) => {
        return next.handle(this.addTokenHeader(request))
      })
    );
  }

  private refreshToken(refreshToken: string): Observable<any> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap((tokens) => {
        // TODO: remove this when back will send two tokens
        const refreshToken = this.authService.getRefreshToken();
        if (refreshToken) {
          tokens.refreshToken = refreshToken;
        }
        return this.authService.saveTokens(tokens);
      }),
      tap(() => {
        this.refreshToken$.next(true);
        this.isRefreshing = false
      }),
      catchError((err) => {
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(err);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>): HttpRequest<any> | any {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      this.authService.navigateToLogin();
      return EMPTY;
    }
    return request.clone({
      setHeaders: {
        Authorization: accessToken
      }
    })
  }
}
