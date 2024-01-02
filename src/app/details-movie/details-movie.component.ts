import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moviesl } from '../model/moviesI';
import { FilmInfoComponent } from '../movie-info/movie-info.component';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { Comment } from '../model/comment';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { response } from 'express';
@Component({
  selector: 'app-details-movie',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,NavComponent,MatIconModule],
  template: `
  <div class="bg-dark"  style="height:max-height;">
 <app-nav/>
    <div class="container align-items-center justify-content-center vh-100 " style="margin-top :4rem">
      <div class="card" style="width: 80rem;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img [src]="this.movieService.getMoviePoster((movie | async)!.poster_path)" class="card-img" alt="Movie Poster">
          </div>
          <div class="col-md-8 d-flex align-items-center">
            <div class="card-body">
              <h2 class="card-title">{{ (movie | async)?.title }}</h2>
              <h5 class="card-title">{{ (movie | async)?.release_date}}</h5>
              <p class="card-text">{{ (movie | async)?.overview }}</p>
              <p class="card-text">The vote average: {{ (movie | async)?.vote_average }}</p>
              <button style="float: inline-end; margin-top:32px ; background-color: black; color:white ; border-radius:12px; display :flex ; align-items:center;justify-content:center" (click)="addToFavorites()">
              <mat-icon  class="text-danger">{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex;">
          <form (ngSubmit)="addComment(userForm)" #userForm = ngForm>
            <div style="margin-left : 6rem ;  ">
              <h3 style="color: red; margin-top:4rem">Comments Section</h3>
              <label for="mail" style=" color:grey ; "> MAIL: </label>
              <input id="mail" type="text" [(ngModel)]="this.commentaire.email" name="email" style="border-radius:12px ; margin-left:50px; padding:6px"  placeholder="Type your mail...">
              <br>
              <br>
              <label for="commentId" style="color:grey ;margin-top:8px"> COMMENT: </label>
              <input type="text" id="commentId" [(ngModel)]="this.commentaire.text" name="text" style="border-radius:12px ; height:6rem; width:20rem;margin-left:10px" placeholder="Type your comment...">
              <button  type="submit" style="width:6rem; background-color:red ; border-radius:12px; margin-left:6px ; " >Add </button>
            </div>
          </form>
          <div style="margin-left: 8rem">
            <h3 style="color: red; margin-top:4rem">Previous Comments</h3>
            <ul style="color: white;">
              <li *ngFor="let comment of comments ">{{comment.email}}: {{comment.text}}</li>
            </ul>
          </div>
        
      </div>
    </div>
    </div>
  `,
  styleUrl: './details-movie.component.css',
  providers: [MovieService]
})
export class DetailsMovieComponent implements OnInit {

  movie: Observable<Moviesl | undefined>;
  moviel :Moviesl
  name:string;
  movieId:number;
  comments: Comment[];

  commentaire= new Comment();


  constructor(private route: ActivatedRoute, public movieService: MovieService) {
    
  }


  ngOnInit(): void {
    const filmId = this.route.snapshot.params['id'];
    this.movieId=filmId;
    console.log(filmId);
     this.movie =this.movieService.getPopularMoviesById(filmId);
     this.movie.subscribe((movie)=>{
      this.moviel=movie;
     });
     this.getComments(filmId);
  }


  addComment(ngForm:NgForm) {
    this.commentaire.email = ngForm.value['email'];
    this.commentaire.text  = ngForm.value['text'];
    this.commentaire.movieId = this.moviel.id;
    this.movieService.addComment(this.commentaire).subscribe((response=>{    
    }))
    this.getComments(this.movieId)

  }


  getComments(filmId:any){
    this.movieService.getComments(filmId).subscribe((response=>{
      console.log("jaw");
      this.comments=response;
    }))
  }

  isFavorite: boolean = false;

 


  addToFavorites() {
    let bodyData={
      filmId : this.moviel.id,
      name: this.moviel.title, 
    }
    
    this.movieService.addToFavorite(bodyData).subscribe((response) => {
      
      this.isFavorite = !this.isFavorite;
    });
  }
} 