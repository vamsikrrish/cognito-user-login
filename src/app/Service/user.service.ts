import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Auth} from 'aws-amplify';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtToken;
  jwtTokenSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor(
    private http:HttpClient
  ) { 
     
  }

 initToken(){
    Auth.currentSession().then(res=>{
      let idToken = res.getIdToken();
      this.jwtToken = idToken.getJwtToken();
      this.jwtTokenSubject.next(true);
    });
  }

  getAllUsers():Observable<any>{
    
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + this.jwtToken)
    }
    
   return this.http.get("https://cyul97ww14.execute-api.us-east-1.amazonaws.com/v1/users",header);
  }

  adduser(userDetail:any){
    const user ={
      username: userDetail.username,
      password: userDetail.password,
      attributes: {
        email: userDetail.email,
        phone_number: userDetail.phone,
      }
    };
    return Auth.signUp(user);
  }
}
