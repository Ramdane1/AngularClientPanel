import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';

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
  searchClients: Client[];

  constructor(private ClientService: ClientService,
              private flashMessage: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private authServiceClient: AuthClientService) { }

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    this.authServiceClient.getAuth().subscribe(auth => {
      this.ClientService.getClients(auth.uid).subscribe(clients => {
        this.searchClients = this.clients = clients
       this.total = this.getTotal();
    })
    
})

}

search(query: string){
  this.searchClients = (query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(query.toLowerCase())
   || client.lastName.toLowerCase().includes(query.toLowerCase())
    || client.email.toLowerCase().includes(query.toLowerCase())
     || client.phone.toString().includes(query.toString()) 
     || client.balance.toString().includes(query.toString()) ): this.clients;
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

  Swal.fire({
    title: 'Are you sure to delete this client?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {

      this.ClientService.deleteClient(id);
      this.flashMessage.show('Client Deleted !',{cssClass: 'alert alert-danger fade show', timeout: 4000});
      this.router.navigate(['/']);
      
      Swal.fire(
        'Deleted!',
        'The client has been deleted.',
        'success'
      )
    }
  })
  

  
}



}
