import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../service/contacts-service';
import { Contact } from '../../Interfaces/contact';


@Component({
  selector: 'app-contacts-details',
  imports: [RouterModule],
  templateUrl: './contacts-details.html',
  styleUrl: './contacts-details.scss'
})
export class ContactsDetails implements OnInit {
  idContacto  = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if(this.idContacto()){
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if(!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if(res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite(){
    if(!this.contacto) return;
      const res = await this.contactService.setFavourite(this.contacto.id);
      if(res) this.contacto.isFavourite = !this.contacto.isFavourite;
    
  }

  async deleteContact(){
    if(!this.contacto) return;
    const res = await this.contactService.deleteContact(this.contacto.id);
    if(res) this.router.navigate(['/']);
  }
}