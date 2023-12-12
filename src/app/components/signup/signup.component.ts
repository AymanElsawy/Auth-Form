import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

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
  private AuthService = inject(AuthService); // inject the AuthService
  private ToastrService = inject(ToastrService); // inject the ToastrService
  private CookieService = inject(CookieService); // inject the CookieService
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
      'photo': new FormControl( Validators.required),
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
    //form data
    let signupFormData = new FormData();  // create a new form data
    Object.keys(this.signupForm.controls).forEach((k => { // loop through the form controls
      signupFormData.append(k, this.signupForm.controls[k].value); // append the form data
    }));
    this.AuthService.register(signupFormData).subscribe({ // send post request
      next: (res) => {
        this.signupForm.reset(); // reset the form
        this.ToastrService.success('Signup Successful', 'Success', {
          positionClass: 'toast-top-center'
        }); // show success
      },
      error: (err) => {
        this.ToastrService.error(err.error.message, 'Error', {
          positionClass: 'toast-top-center'
        }); // show error
      },
      complete: () => {
        
      }
    })
  }
}
