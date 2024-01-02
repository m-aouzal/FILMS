import { Routes } from '@angular/router';
import { MoviesListComponent } from './movie/movie.component';
import { DetailsMovieComponent } from './details-movie/details-movie.component'; 
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FavoriteComponent } from './favorite/favorite.component';

export const routes: Routes = [
  
    {
        path: 'list',
        component :MoviesListComponent,
        title : 'Movies list'
    },
    {
        path : 'detail/:id',
        component : DetailsMovieComponent,
        title : 'Movie detail'

    },
    {
        path : 'sign-in',
        component :SignInComponent,
        title : 'Sign In'
    },
    {
        path : 'sign-up',
        component :SignUpComponent,
        title : 'Sign Up'
    },
    {
        path : 'favorite',
        component :FavoriteComponent,
        title : 'Favorite Movies'
    },
    {
        path:'**',
        redirectTo: 'list'
    }
    
];
