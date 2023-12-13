import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user = {} as User;
  token!: string;
  private CookieService = inject(CookieService); // inject the CookieService
  private router = inject(Router);  // inject the Router
  private route = inject(ActivatedRoute);  // inject the ActivatedRoute

  ngOnInit() {
    this.getPayload(); // get the payload
  }

  getPayload() {
    let payload;
    if (this.CookieService.get('token')) {
      payload = this.CookieService.get('token').split('.')[1]; // split token into 3 parts
      payload = JSON.parse(window.atob(payload)); // decode payload
      this.user = payload; // set the user
    }
  }

  logOut() {
    this.CookieService.delete('token'); // delete the token
    this.router.navigate(['/']); // navigate to login
  }
}
