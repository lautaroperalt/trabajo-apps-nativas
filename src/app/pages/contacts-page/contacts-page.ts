import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { AuthService } from '../../service/auth-service';
import { ContactsService } from '../../service/contacts-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage implements OnInit{
  ngOnInit(): void {
    this.contactsService.getContacts(); //carga los contactos al iniciar
  }

  authService = inject(AuthService);
  contactsService = inject(ContactsService); 

  contactsOrdenados(){
    const lista = this.contactsService.contacts.slice();
    return lista.sort((a, b) => { 
      if (a.isFavourite && !b.isFavourite) return -1;
      if (!a.isFavourite && b.isFavourite) return 1;
      const nF = (a.firstName || '').localeCompare(b.firstName || '');
      if (nF !== 0) return nF;  
      return (a.lastName || '').localeCompare(b.lastName || '');
    });
    }
  }
