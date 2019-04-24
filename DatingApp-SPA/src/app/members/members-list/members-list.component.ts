import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { IUser } from '../../_models/IUser';
import { AlertifyServiceService } from '../../_services/AlertifyService.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  users: IUser[];
  constructor(private userService: UserService, private alertify: AlertifyServiceService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

}
