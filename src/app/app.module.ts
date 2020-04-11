import { ClientService } from './services/client.service';
import { AuthClientService } from './services/auth-client.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { NavbarClientComponent } from './components/navbar-client/navbar-client.component';
import { SidebarClientComponent } from './components/sidebar-client/sidebar-client.component';
import { SettingsClientComponent } from './components/settings-client/settings-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    DetailsClientComponent,
    NavbarClientComponent,
    SidebarClientComponent,
    SettingsClientComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ClientService,
    AuthClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
