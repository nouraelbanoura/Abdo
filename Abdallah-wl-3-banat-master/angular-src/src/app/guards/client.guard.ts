import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()

export class ClientGuard implements CanActivate{
constructor(private authService:AuthService , private router:Router){

}

canActivate(){


if (this.authService.loggedIn()){
   var x = localStorage.getItem('user');
    var user = JSON.parse(x);
   var type = user.type;
if (type == 0){
    return true;

}else if(type ==1){
this.router.navigate(['/Bprovider']);
return false;
    }else{
this.router.navigate(['/Admin']);
return false;
    }
}
else{
  this.router.navigate(['/Login']);
  return false;
}
}
}
