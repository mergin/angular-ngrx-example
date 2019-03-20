import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '@app/store/app.reducers';
import * as fromAuth from '@app/auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        // const copiedReq = req.clone({headers: req.headers.set('', '')});
        return this.store.select('auth')
            .pipe(
                // bug fix, only take this value once
                take(1),
                // we use switchMap so no to wrap and oservable inside and observable
                switchMap(
                    (authState: fromAuth.State) => {
                        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
                        return next.handle(copiedReq);
                    }
                )
            );
        // return null;
    }
}
