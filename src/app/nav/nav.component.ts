import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersloginService } from '../service/users.login.service'; 
import { Subscription } from 'rxjs';
@Component({
  selector: "app-nav",
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="navbar  justify-content-between"
      style="margin-bottom: 60px; margin-left:12px ; margin-right:12px; padding-top:12px"
    >
      <a class="nav-link " style="color:red" href="/list"
        ><h3>EMi Movies</h3></a
      >
      <div style=" display:flex ;gap:24px">
        <a
          *ngIf="isAuthenticated"
           class="nav-link "
          style="color:red ;"
          href="/favorite"
          >Fav Movies</a
        >
        <a
          *ngIf="isAuthenticated"
          class="nav-link "
          style="color:red ;"
          (click)="onLogout()"
          >Logout</a
        >
        <a
          *ngIf="!isAuthenticated"
          class="nav-link "
          style="color:red ;"
          (click)="onLogin()"
          >SingIn</a
        >
      </div>
    </nav>
  `,
  styleUrl: "./nav.component.css",
})
export class NavComponent {
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private router: Router,
    private userLoginService: UsersloginService
  ) {}

  ngOnInit() {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log("user", user);
      this.isAuthenticated = !!user;
    });
  }
  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(["/login"]);
  }
}
