import { Component, OnInit } from '@angular/core';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone : null,
    balance:null
  };

  constructor(private clientService:ClientService,
             private route: ActivatedRoute,
             private router: Router,
             private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // id le meme nom qui est dans la route dans appmodule (client/'id')
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    })
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client Updated', {cssClass: 'alert alert-success', timeout: 4000});
    this.router.navigate(['/client/', this.id]);

  }

}
