import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyServiceService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Login success');
    }, error =>{
      this.alertify.error(error);
    },() => {
      this.router.navigate(['/members']);
    });
    }

    loggedIn(){
      return this.authService.loggedIn();
    }

    logout(){
      localStorage.removeItem('token');
      this.alertify.message('Logged out');
      this.router.navigate(['/home']);
    }

}
