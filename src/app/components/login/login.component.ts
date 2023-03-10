import { Component } from '@angular/core';
import { FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
//import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type: string ="password"
  isText:boolean = false ;
  eyeIcon: string = "fa-eye-slash";
  loginForm! : FormGroup; //3
  //2 indect FormBuilder ,AuthService

  // firstName: string = ' ';
  // lastName: string = '' ;



  // public onUsernameInputChanged(e:Event) {
  //   this.firstName = (<HTMLInputElement>e.target ).value;
  //   this.lastName = (<HTMLInputElement>e.target ).value;
  // }



  constructor(private fb:FormBuilder , private auth:AuthService, private router: Router) {}

  //4 initialization
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
     })
  }

  hideShowPass(){
    this.isText = !this.isText ; // to change eye mode from visible to unvisible
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash" ;
    this.isText ? this.type = "text" : this.type = "password" ;

  }

  onLogin() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value)
      //send the obj to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          // after adding dashboard:if the login is success we
          this.loginForm.reset();
          // reset the form & send the User to dashboard page
          this.router.navigate(['dashboard'])
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })


    }else {
        console.log("Form is valid ");
        //throw the error using toaster and with required fields
        ValidateForm.ValidateAllFormFields(this.loginForm);
        alert("Your Login Form is Invalid")
    }
  }



}
