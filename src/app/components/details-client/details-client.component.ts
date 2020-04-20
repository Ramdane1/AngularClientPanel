import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.scss']
})
export class DetailsClientComponent implements OnInit {

  id: string;
  client: Client;
  showBalance: boolean = false;
  constructor(private ClientService:ClientService,
             private router: Router,
             private route: ActivatedRoute,
             private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // id le meme nom qui est dans la route dans appmodule (client/'id')
    this.ClientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    })
  }

  onSubmit(){
    this.client.id = this.id;
    this.ClientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated !',{cssClass: 'alert alert-warning fade show', timeout: 4000});
    this.showBalance = false;
  }

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
