import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../service/contacts-service';
import { Contact } from '../../Interfaces/contact';
import { Spinner } from '../../components/spinner/spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacts-details',
  imports: [RouterModule, Spinner],
  templateUrl: './contacts-details.html',
  styleUrl: './contacts-details.scss'
})
export class ContactsDetails implements OnInit {
  id  = input.required<string>();
  readonly contactService = inject(ContactsService);

  contacto: Contact | undefined;
  cargandoContacto = false;

  router = inject(Router);

  readonly defaultImageUrl = 'https://via.placeholder.com/150/fdfaf6/a0938a?text=Contacto';

  async ngOnInit() {
    if(!this.id()) return;

      this.cargandoContacto = true;
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.id());
      
      const res = await this.contactService.getContactById(this.id());
      if(res) this.contacto = res;
      
      this.cargandoContacto = false;
  }

  imagenError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImageUrl;
  }

  async toggleFavorite(){
    if(!this.contacto) return;
      const res = await this.contactService.setFavorite(this.contacto.id);
      if(res) this.contacto.isFavorite = !this.contacto.isFavorite;
    
  }

  async deleteContact(){
    if(!this.contacto) return;
    
    Swal.fire({
      title: "¿Desea borrar el contacto?", 
      text: `Eliminar a ${this.contacto.firstName} ${this.contacto.lastName || ''}`, 
      icon: "warning",
      showDenyButton: true, 
      showCancelButton: true, 
      showConfirmButton: false, 
      cancelButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
      
    }).then(async (result) => { 
      
      if (result.isDenied) {
       
        const res = await this.contactService.deleteContact(this.contacto!.id);
        if(res) {
            Swal.fire('¡Eliminado!', 'El contacto ha sido eliminado.', 'success');
            this.router.navigate(['/']);
        }
      }
    });
  }
}