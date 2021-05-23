import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Auth} from 'aws-amplify';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http:HttpClient
  ) { }

  getAllUsers():Observable<any>{
   return this.http.get("https://nn9hebqox8.execute-api.us-east-1.amazonaws.com/Test");
  }

  adduser(userDetail:any){
    const user ={
      username: userDetail.username,
      password: userDetail.password,
      attributes: {
        email: userDetail.email,
        phone_number: userDetail.mobile,
      }
    };
    return Auth.signUp(user);
  }
}
