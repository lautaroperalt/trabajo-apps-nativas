import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {

  authService = inject(AuthService);
  
  openLogaoutModal(){
    Swal.fire({
    title: "Desea cerrar sesion?",
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "cancelar",
    denyButtonText: `Cerrar sesion`,
  }).then((result) => {
    if (result.isDenied) {  /* Reviso que haya clickeado el boton rojo */
      this.authService.logout();
  }
  });
}
}
