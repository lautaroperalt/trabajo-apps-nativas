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
  id  = input.required<string>();
  readonly contactService = inject(ContactsService);

  contacto: Contact | undefined;
  cargandoContacto = false;

  router = inject(Router);

  async ngOnInit() {
    if(!this.id()) return;

      this.cargandoContacto = true;
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.id());
      
      const res = await this.contactService.getContactById(this.id());
      if(res) this.contacto = res;
      
      this.cargandoContacto = false;
  }

  async toggleFavorite(){
    if(!this.contacto) return;
      const res = await this.contactService.setFavorite(this.contacto.id);
      if(res) this.contacto.isFavorite = !this.contacto.isFavorite;
    
  }

  async deleteContact(){
    if(!this.contacto) return;
    const res = await this.contactService.deleteContact(this.contacto.id);
    if(res) this.router.navigate(['/']);
  }
}