import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
user:any;
authToken:any;
  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/login',user,{headers:headers})
    .map(res => res.json());
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  getProfile(){
let headers = new Headers();
this.loadToken();
headers.append('Authorization', this.authToken);
headers.append('Content-type','application/json');
console.log(this.authToken);
return this.http.get('http://localhost:8080/clients/Profile',{headers:headers})
.map(res => res.json());

}
loadToken(){
const token = localStorage.getItem('id_token');
this.authToken = token;
}
  loggedIn(){
    return tokenNotExpired('id_token');
  }
  isClient(){
    if(this.loggedIn()){
      var user = JSON.parse(localStorage.getItem('user'));
      if(user.type == 0){
        return true;
      }
    else{
      return false;
    }
  }
    return false;
  }
  isBprovider(){
      if(this.loggedIn()){
        var user = JSON.parse(localStorage.getItem('user'));
        if(user.type == 1){
          return true;
        }
      else{
        return false;
      }
    }
      return false;

  }
  isAdmin(){
    if(this.loggedIn()){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.type == 2)
    return true;
    else
    return false;
  }
  else
  return false;
  }
  registerClient(client){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/register/0',client,{headers:headers})
    .map(res => res.json());
  }
  registerbProvider(bprovider){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/register/1',bprovider,{headers:headers})
    .map(res => res.json());
  }


}
