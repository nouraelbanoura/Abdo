import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()

export class AdminGuard implements CanActivate{
constructor(private authService:AuthService , private router:Router){

}

canActivate(){


if (this.authService.loggedIn()){
   var x = localStorage.getItem('user');
    var user = JSON.parse(x);


   var type = user.type;
if (type == 2){
    return true;

}else{
    if(type == 1){
this.router.navigate(['/Bprovider']);
    }else{
this.router.navigate(['/clients']);

    }
return false;
}
}else{

this.router.navigate(['/Login']);
return false;
}

}
}
