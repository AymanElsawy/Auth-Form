import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  imagePerview: string = "";
  errorMessage!: string;
  private AuthService = inject(AuthService); // inject the AuthService
  private ToastrService = inject(ToastrService); // inject the ToastrService
  private CookieService = inject(CookieService); // inject the CookieService
  private router = inject(Router);  // inject the Router

  ngOnInit() {
    this.formInit(); // initialize the form
  }

  formInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeat_password': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'photo': new FormControl(Validators.required),
    });
  }


  //select photo


  onSelectPhoto(event: any) {
    const file = event?.target?.files[0]; // get the selected image
    if (file) {
      this.imagePerview = URL.createObjectURL(file); // create a preview image
    }
    this.signupForm.patchValue({ photo: file }); // update form value
    this.signupForm.get('photo')?.updateValueAndValidity(); // update form
  }

  signup() {
    this.errorMessage = ""; // reset the error message
    //form data
    let signupFormData = new FormData();  // create a new form data
    Object.keys(this.signupForm.controls).forEach((k => { // loop through the form controls
      signupFormData.append(k, this.signupForm.controls[k].value); // append the form data
    }));
    this.AuthService.register(signupFormData).subscribe({ // send post request
      next: (res) => {
        this.signupForm.reset(); // reset the form
        this.imagePerview = ""; // reset the image
        this.CookieService.set('token', res.token); // set the token in the cookie
        this.ToastrService.success('Signup Successful', 'Success', {
          positionClass: 'toast-top-center',
          closeButton: true,
        }); // show success
      },
      error: (err) => {
        this.errorMessage = err.error.message; // set the error message
        this.ToastrService.error(err.error.message, 'Error', {
          positionClass: 'toast-top-center',
          closeButton: true,
        }); // show error
      },
      complete: () => {
        this.errorMessage = ""; // reset the error message
        this.router.navigate(['/home']); // navigate to login
      }
    })
  }
}
