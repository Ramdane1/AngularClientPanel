import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  total: number=0;
  id: string;
  client: Client;

  constructor(private ClientService: ClientService,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    
    this.ClientService.getClients().subscribe(clients => {
      this.clients = clients
     this.total = this.getTotal();
})

}

getTotal(){
  return this.clients.reduce((total, client) => {
    return total - (-client.balance);
  }, 0)
}

/*getTotal(){
  return this.clients.reduce((total, client) => {
    return total + parseFloat(client.balance.toString());
  }, 0)
}*/

deleteClient(id: string){
  if(confirm('Are you sure to delete this client ?')){
  this.ClientService.deleteClient(id);
  this.flashMessage.show('Client Deleted !',{cssClass: 'alert alert-danger fade show', timeout: 4000});
  this.router.navigate(['/']);
  }
}

}
