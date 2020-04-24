import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName:"",
    email:"",
    phone:null,
    balance:null,
    user: ''
  }

  constructor(private ClientService: ClientService,
              private authClientService: AuthClientService,
               private route: Router,
               private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.authClientService.getAuth().subscribe(auth => {
      this.client.user = auth.uid;
    })
  }

  onSubmit(){
    this.ClientService.newClient(this.client);
    this.flashMessages.show('Client added successfully !', {cssClass: 'alert alert-success fade show', timeout: 5000})
    return this.route.navigate(['/']);
  }

}
