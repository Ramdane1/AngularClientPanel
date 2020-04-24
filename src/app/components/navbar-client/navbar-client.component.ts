import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent implements OnInit {

  isLogedIn: boolean = false;
  userLogedIn: string;
  constructor(private authService: AuthClientService,
              private flashMessage: FlashMessagesService,
              private route: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLogedIn = true;
        this.userLogedIn = auth.email;
      }
      else{
        this.isLogedIn = false;
      }
    })
  }

  onLogOut(){
    this.authService.logOut();
    this.isLogedIn = false;
   return this.route.navigate(['/login']);

  }
}
