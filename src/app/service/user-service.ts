import { Injectable } from '@angular/core';
import { NewUser } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserSercice {
  /** Registrar el usuario en el back */
  async register(registerData:NewUser){
   return await fetch("https://agenda-api.somee.com/api/Users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    });
  }
}
