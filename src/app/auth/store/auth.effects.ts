import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    // signup effect
    // listen to any actions in the code
    // at the end typically it is dispatched a new effect
    // @Effect({ dispatch: false })
    @Effect()
    authSignup = this.actions$

        // only if action is TRY_SIGNUP
        .pipe(
            ofType(AuthActions.TRY_SIGNUP),
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }),

            // reach to firebase and create an user
            switchMap((authData: { username: string, password: string }) => {
                return from(
                    firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
                );
            }),

            // get the token from firebase
            switchMap(() => {
                return from(
                    firebase.auth().currentUser.getIdToken()
                );
            }),

            // return 2 effects to dispatch as a result of the chain in new observable
            mergeMap((token: string) => {
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    // signin effect
    @Effect()
    authSignin = this.actions$
        .pipe(
            // only if action is TRY_SIGNINx
            ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignin) => {
                return action.payload;
            }),

            // reach to firebase and signn the user
            switchMap((authData: { username: string, password: string }) => {
                return from(
                    firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
                );
            }),

            // get the token from firebase
            switchMap(() => {
                return from(
                    firebase.auth().currentUser.getIdToken()
                );
            }),

            // return 2 effects to dispatch as a result of the chain in new observable
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    // logout
    @Effect({ dispatch: false })
    authLogout = this.actions$
        .pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                firebase.auth().signOut();
                this.router.navigate(['/']);
            })
        );

    constructor(
        private actions$: Actions,
        private router: Router
    ) { }
}
