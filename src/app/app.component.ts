import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';
import { DxFormComponent } from 'devextreme-angular';
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
  formFields: FormFieldTypes;
  submitButtonOptions: any = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true,
    onClick:"addUser"
}
  constructor(private ref: ChangeDetectorRef,private userService:UserService) {
     this.formFields = [
      {
        type: "username",
        label: "Username *",
        inputProps: { required: true, autocomplete: "username" },
      },
      {
        type: "password",
        label: "Password *",
        inputProps: { required: true, autocomplete: "new-password" },
      },
      {
        type: "email",
        label: "E-mail *",
        inputProps: { required: true, autocomplete: "email" },
      },      {
        type: "phone_number",
        label: "Phone",
        inputProps: { required: false,},
        value:"91"
      }
    ];

  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.userService.initToken();
      this.ref.detectChanges();
    });

    this.userService.jwtTokenSubject.subscribe((authenticated)=>{
      if(authenticated){
        this.fetchUsers();
      }
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

  addUser(e){
    this.userService.adduser(this.userDetail).then((response:any)=>{
        this.showAddPopUp=false;
        console.log(response);
    },(err)=>{
      this.message=err.message;
      this.isToastVisible= true;
      console.log(this.isToastVisible,this.message,this.type);
    });

  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        template: 'addButtonTemplate'
    },{
      location: 'after',
      template: 'refreshButtonTemplate'
  });
}

}