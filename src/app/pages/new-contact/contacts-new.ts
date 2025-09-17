import { Component, inject } from '@angular/core';
import { NewContact } from '../../Interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts-new',
  imports: [FormsModule, RouterModule],
  templateUrl: './contacts-new.html',
  styleUrl: './contacts-new.scss'
})
export class ContactsNew {
  createContact(form:any){
    const nuevoContacto: NewContact ={
      firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        email: form.email,
        image: form.image,
        number: form.number,
        company: form.company,
        isFavourite: form.isFavorite
    }
  
    this.contactsService.createContact(nuevoContacto)
  }
  contactsService = inject(ContactsService); 
}
