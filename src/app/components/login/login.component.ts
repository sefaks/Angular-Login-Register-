import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


      loginForm=this.fb.group({
        email:['', [Validators.required,Validators.email]],
        password:['', Validators.required],

      })

        constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private messageService:MessageService){}

        get email(){

          return this.loginForm.controls['email'];
        }
        get password(){

          return this.loginForm.controls['password'];
        }

        loginUser() {
          const { email, password } = this.loginForm.value;
        
      
          if (!email || !password) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please provide email and password' });
            return;
          }
        
          
          this.authService.getUserByEmail(email as string).subscribe(
            (response: User) => {
              if (response) {
                if (response.password === password) {
                  sessionStorage.setItem('email', email as string);
                  this.router.navigate(['/home']);
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password' });
                }
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
              }
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
            }
          );
          
        }
      }
