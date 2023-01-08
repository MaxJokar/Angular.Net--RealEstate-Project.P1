import { Component } from '@angular/core';
import { FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';
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
  constructor(private fb:FormBuilder , private auth:AuthService) {}

  //4 initialization
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
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
        next:(res)=>{
          alert(res.message)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })


    }else {
        console.log("Form is valid ");
        //throw the error using toaster and with required fields
        this.validateAllFormFileds(this.loginForm);
        alert("Your Form is Invalid")
    }
  }

  private validateAllFormFileds(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty( {onlySelf:true });
      } else if(control instanceof FormGroup) {
        this.validateAllFormFileds(control)
      }

    })

  }


}