import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  userList =[];
  showAddPopUp:boolean =false;
  userDetail={};
  isToastVisible:boolean =false;
  type:string ='error';
  message:string='';
  constructor(private ref: ChangeDetectorRef,private userService:UserService) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if(this.user){
        this.fetchUsers();
      }
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  refresh(){
    this.fetchUsers();
  }
  

  fetchUsers(){
    this.userList=[];
    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.userList = response.data.Users;
        this.ref.detectChanges();
        console.log(this.userList);
     },(err)=>{
       console.log(err);
     });
  }

  addUser(){
    this.userService.adduser(this.userDetail).then((response:any)=>{
        this.showAddPopUp=false;
        console.log(response);
    },(err)=>{
      this.message=err.message;
      this.isToastVisible= true;
      console.log(this.isToastVisible,this.message,this.type);
    });

  }
}