import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  emailErrorMessage!: string;
  passwordErrorMessage!: string;
  loading: boolean = false;

  private AuthService = inject(AuthService); // inject the AuthService
  private ToastrService = inject(ToastrService); // inject the ToastrService
  private CookieService = inject(CookieService); // inject the CookieService
  private router = inject(Router); // inject the Router
  ngOnInit() {
    this.formInit(); // initialize the form
  }

  formInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.loading = true; // set the loading to true
    this.emailErrorMessage = ''; // reset the error message
    this.passwordErrorMessage = ''; // reset the error message
    const email = this.loginForm.value.email; // get the email and password
    const password = this.loginForm.value.password;
    this.AuthService.login(email, password).subscribe({
      next: (res) => {
        this.CookieService.set('token', res.token); // set the token in the cookie
        this.loginForm.reset(); // reset the form
        this.ToastrService.success('Login Successful', 'Success', {
          positionClass: 'toast-top-center',
          closeButton: true,
        }); // show success
        this.loading = false; // set the loading to false
      },
      error: (err) => {
        this.ToastrService.error(err.error.message, 'Error', {
          positionClass: 'toast-top-center',
          closeButton: true,
        }); // show error
        if (err.status == 404) this.emailErrorMessage = err.error.message; // set the error message
        if (err.status == 401) this.passwordErrorMessage = err.error.message; // set the error message
        this.loading = false; // set the loading to false
      },
      complete: () => {
        this.emailErrorMessage = ''; // reset the error message
        this.passwordErrorMessage = ''; // reset the error message
        this.router.navigate(['/home']); // navigate to home
      }
    })
  }
}
