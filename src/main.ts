import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import {
  BrowserModule,
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { routes } from './app/app.routes';
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(),
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyAHj03NbTogSg-Gx7WqthCAL6Wls7bhPKg",
          authDomain: "emi-movies.firebaseapp.com",
          projectId: "emi-movies",
          storageBucket: "emi-movies.appspot.com",
          messagingSenderId: "982937575977",
          appId: "1:982937575977:web:0673d0c8948d3c5c92b238",
          measurementId: "G-03DC8SYL7B"
        })
      ),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideDatabase(() => getDatabase())
    ),
  ],
}).catch((err) => console.error(err));