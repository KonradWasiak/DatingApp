import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { registerContentQuery } from '@angular/core/src/render3';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private auth: AuthService, private alertify: AlertifyServiceService) { }

  ngOnInit() {
  }

  register(){
    this.auth.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration success');
    }, error => {
      this.alertify.error(error);
    });

  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
