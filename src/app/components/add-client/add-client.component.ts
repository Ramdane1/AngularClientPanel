import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    balance:null
  }

  constructor(private ClientService: ClientService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.ClientService.newClient(this.client);
    return this.route.navigate(['/']);
  }

}
