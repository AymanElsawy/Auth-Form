import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user = {} as User;

  private CookieService = inject(CookieService); // inject the CookieService
  private router = inject(Router);  // inject the Router

  ngOnInit() {
    const token = this.CookieService.get('token'); // get the token
    if (token) {
      this.user = JSON.parse(atob(token.split('.')[1])); // parse the token
      if (this.user.exp < Date.now() / 1000) { // check if the token is expired
        this.CookieService.delete('token'); // delete the token
        this.router.navigate(['/']); // navigate to login
      }
      console.log(this.user);
    }
  }

  logOut() {
    this.CookieService.delete('token'); // delete the token
    this.router.navigate(['/']); // navigate to login
  }
}
