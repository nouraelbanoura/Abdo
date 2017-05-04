import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {BproviderService} from '../../services/bprovider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(private flashMessage:FlashMessagesService,
  private router:Router,
  private authService:AuthService,
  private bproviderservice:BproviderService) {}

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.flashMessage.show('You are already logged in!',{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['/']);
    }
  }

  onLoginSubmit(){
    const user = {
      username:this.username,
      password:this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
      this.flashMessage.show(data.msg,{cssClass:'alert-success',timeout:3000});
      this.authService.storeUserData(data.token,data.user);
      if(data.user.type == 0)
      this.router.navigate(['Profile']);
      else if(data.user.type == 1) //declined business
    {
     this.bproviderservice.FindBPandB().subscribe(result =>{
     console.log(result.business);
    localStorage.setItem('isDeclined',result.business.isDeclined);
      this.router.navigate(['Bprovider']);
    }
  );

    }
      else this.router.navigate(['Admin']);
    }
      else{
      this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['login']);
    }
    })
  }

}
