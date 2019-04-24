import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/_models/IUser";
import { UserService } from "src/app/_services/user.service";
import { AlertifyServiceService } from "src/app/_services/AlertifyService.service";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { userInfo } from "os";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  user: IUser;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUser();
    console.log(this.user);
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (user: IUser) => {
        this.user = user;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }
}
