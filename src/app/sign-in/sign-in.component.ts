import { Component } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  template: `
    <div class="bg-dark" style="height: 100vh;">
      <div style="color: red; font-weight: bolder; font-size: 32px; padding: 10px">EMI MOVIES</div>
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Log In</h2>

              <form (ngSubmit)="submitForm()" [formGroup]="loginForm">
                <div class="form-outline mb-4">
                  <span *ngIf="checkVar" style="color: red; margin-left: 180px; margin-bottom: 24px">Fill All The Fields</span>
                  <input type="email" id="form3Example1cg" class="form-control form-control-lg" formControlName="email" />
                  <label class="form-label" for="form3Example1cg">Your Email</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" formControlName="password" />
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-danger btn-block btn-lg gradient-custom-4 text-body">Log In</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">You don't have an account? <a routerLink="/sign-up" class="fw-bold text-body"><u>Sign up here</u></a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [FormGroup],
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  checkVar: boolean = false;

 

  constructor(
    private formBuilder: FormBuilder,
 
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    const formGroup = this.loginForm;

    if (formGroup.invalid) {
      this.checkVar = true;
      return;
    }

    formGroup.reset();
  }

 
}
