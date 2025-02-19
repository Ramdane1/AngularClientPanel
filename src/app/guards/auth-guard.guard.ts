import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth, private route: Router){}

  canActivate(): Observable<boolean>{
   return this.afAuth.authState.pipe(map(auth => {
      if(!auth){
        this.route.navigate(['/login']);
        return false;
      }else {
        return true;
      }
    }))
  }
  
}
