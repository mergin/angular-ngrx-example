import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDjdIW2DmQmr9_opH9h8VWBKC2Iy-uDcyE',
            authDomain: 'udemy-recipes-angular-tutorial.firebaseapp.com'
        });
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
