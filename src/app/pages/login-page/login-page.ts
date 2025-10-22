import { Component, inject } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../../service/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from "../../components/spinner/spinner";

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  
  errorLogin = false;
  authService = inject(AuthService)  
  isLoading = false;
  router = inject(Router)

  async login(form:NgForm){
    this.errorLogin = false;
    if(!form.value.email || !form.value.password){
      return
    }

    this.isLoading = true;
    const loginExitos = await this.authService.login(form.value);
    this.isLoading = false;

    if(loginExitos){
      this.router.navigate(['/'])
    }else{
      this.errorLogin = true
    }
  }
}