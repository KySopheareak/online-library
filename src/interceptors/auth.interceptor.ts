import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, from, lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, first, map, mergeMap, share } from 'rxjs/operators';
import { LocalStorageEnum } from '../types/enums/local-storage.enum';
import { IRefreshTokenResponse } from '../types/response/refresh-token.response';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';
//NOTE: Refresh token fail while token is not expired it seem because in development angular refresh page at same time so when client from multi tab refresh token at same time using 1 token only first request success other will fail and logout.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  tokenBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refresh_token_url = environment.api_url + '/auth/user/renew-token';
    const refresh_token = this.localStorageService.get(LocalStorageEnum.RefreshToken);
    let token = this.localStorageService.get(LocalStorageEnum.Token);
    if (req.url == refresh_token_url) {
      req = this.addToken(req, refresh_token);
    } else if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          if (req.url === refresh_token_url) {
            this.logout();
          } else if (refresh_token) {
            return from(this.refreshToken(refresh_token_url, this.http)).pipe(
              mergeMap((token: any) => {
                this.localStorageService.set(LocalStorageEnum.Token, token);
                return next.handle(this.addToken(req, token));
              }),
              catchError(err => {
                // If we don't get a new token, we are in trouble so logout.
                this.logout();
                return throwError(() => err);
              })
            );
          } else {
            this.logout();
          }
        }
        return throwError(() => err);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  private logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  httpRequest!: Observable<string>;
  private async refreshToken(refresh_url: string, http: HttpClient): Promise<string> {
    if (!this.httpRequest) {
      this.httpRequest = http
        .post<IRefreshTokenResponse>(refresh_url, {})
        .pipe(map(res => res.data.token))
        .pipe(first())
        .pipe(share());
    }
    const res = await lastValueFrom(this.httpRequest);
    this.localStorageService.set(LocalStorageEnum.Token, res);
    return res;
  }
}