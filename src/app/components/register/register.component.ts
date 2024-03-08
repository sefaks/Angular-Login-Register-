import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMathValidator } from '../../shared/password-math-directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private namePattern: RegExp = /^[a-zA-Z\s]*$/;

  registerForm = this.fb.group({
    fullName:['',[Validators.required,Validators.pattern(this.namePattern)]],
    email:['', [Validators.required,Validators.email]],
     password:['', Validators.required],
     confirmPassword:['',Validators.required]
  },{
    validators: passwordMathValidator
 

  })
  constructor(private fb:FormBuilder){}


  get fullName(){
    return this.registerForm.controls['fullName'];
  }
  get email(){

    return this.registerForm.controls['email'];
  }
  get password(){

    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

}
