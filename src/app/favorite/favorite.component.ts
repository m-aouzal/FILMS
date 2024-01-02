import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { MovieService } from '../movie.service';
import { Moviesl } from '../model/moviesI';
import { HttpClientModule } from '@angular/common/http';
import { FilmInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule ,NavComponent,HttpClientModule,FilmInfoComponent],
  template: `
      <div class="bg-dark"  style="height: 100vh;">
        <app-nav></app-nav>
        <div class="container mt-5">
      <div class="row justify-content-center">
       <div class="col" *ngFor="let movie of movies">
      <app-film-info [movie]="movie"></app-film-info>
    </div>
  </div>
</div>

      </div>
  `,
  styleUrl: './favorite.component.css',
  providers:[MovieService]
})
export class FavoriteComponent  {



  movies :Moviesl[]= [];
  movieIds: number[] = [];
  
  constructor(private movieService: MovieService){
    this.getFavorites();
  }

  getFavorites(){
  this.movieService.getFavorites().subscribe((response)=>{
      this.movieIds = response;
      this.getMoviesByIds();
    })
  }

  getMoviesByIds() {
    this.movieIds.forEach((id) => {
      this.movieService.getPopularMoviesById(id).subscribe((movie) => {
        this.movies.push(movie);
      });
    });
  }




}
