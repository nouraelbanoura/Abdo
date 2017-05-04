import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()

export class BproviderGuard implements CanActivate{
constructor(private authService:AuthService , private router:Router){

}

canActivate(){


if (this.authService.loggedIn()){
   var x = localStorage.getItem('user');
    var user = JSON.parse(x);


   var type = user.type;  
if (type == 1){
    return true;

}else{
    if(type == 0){
this.router.navigate(['/clients']);
    }else{
        this.router.navigate(['/Bprovider']);
    }
return false;    

}
}else{

this.router.navigate(['/Login']);
return false;
}

}
}