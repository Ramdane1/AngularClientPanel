import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthClientService,
              private flashMessage: FlashMessagesService,
              private route: Router) { }

  ngOnInit() {
   this.authService.getAuth().subscribe(auth => {
      if(auth){
       return this.route.navigate(['/']);
      }
    })
  }


  onLogin(){
    this.authService.login(this.email, this.password)
    .then(auth => {
      if(auth){
        this.flashMessage.show('You are logged succesfully',{
          cssClass: "alert alert-success", timeout: 5000
        })

        this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessage.show(error.message,{
        cssClass: "alert alert-danger", timeout: 10000
      })
    })
  }

  onLoginWithGoogle(){
    this.authService.loginWithGoogle()
    .then(auth => {
      if(auth){
        this.flashMessage.show('You are logged succesfully',{
          cssClass: "alert alert-success", timeout: 5000
        })

        this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessage.show(error.message,{
        cssClass: "alert alert-danger", timeout: 10000
      })
    })
  }
}
