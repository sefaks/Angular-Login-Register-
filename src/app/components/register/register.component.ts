import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-math-directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { response } from 'express';

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
    validators: passwordMatchValidator
 

  })
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private messageService:MessageService,
    private router:Router
    
    ){}


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

  submitDetails(){
    const postData=this.registerForm.value;
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      (      response: any) => {
        console.log(response);
        this.messageService.add({severity: 'success', summary:'Success',detail:'Register Successfully'});
        this.router.navigate(['login'])
      },
      (      error: any)=> {

        this.messageService.add({severity: 'error', summary:'Error',detail:'Something went wrong'});

      }
  )
  }


}
