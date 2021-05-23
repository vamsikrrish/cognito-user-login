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

  constructor(private ref: ChangeDetectorRef,private authService:UserService) {}

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
  

  fetchUsers(){
    this.authService.getAllUsers().subscribe(
      (response)=>{
        this.userList = response.data.Users;
        this.ref.detectChanges();
        console.log(this.userList);
     },(err)=>{
       console.log(err);
     });
  }
}