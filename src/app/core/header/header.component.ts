import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '@app/shared/data-storage.service';
import * as fromApp from '@app/store/app.reducers';
import * as fromAuth from '@app/auth/store/auth.reducers';
import * as AuthActions from '@app/auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(
        private dataStorageService: DataStorageService,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}
