import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  template: `
    <div class="bg-dark" style="height: 100vh;">
      <div style="color: red; font-weight: bolder; font-size: 32px; padding: 10px">EMI MOVIES</div>
      <div class="row d-flex justify-content-center align-items-center h-100 ">

        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form (ngSubmit)="onSubmitSignUp()" [formGroup]="signUpForm">

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" formControlName="email" />
                  <label class="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" formControlName="password" />
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-danger btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a routerLink="/sign-in" class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,

    private router: Router
  ) {
    
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSignUp() {
    this.submitForm();
  }
  onHandleError() {
    this.error = null;
  }
  private submitForm() {
 
    const formGroup = this.signUpForm;

    if (formGroup.invalid) {
      return;
    }

    formGroup.reset();
  }

}