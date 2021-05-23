import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@aws-amplify/api';
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
}
