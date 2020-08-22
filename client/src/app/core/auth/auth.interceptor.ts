import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    const handler = token
      ? next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      : next.handle(req);

    return handler.pipe(
      catchError(response => {
        if (response.status === 401) {
          this.authService.logout();
        }

        return throwError(response);
      }),
    );
  }
}
