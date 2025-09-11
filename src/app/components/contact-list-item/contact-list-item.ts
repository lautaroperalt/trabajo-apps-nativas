import { Component, inject, input } from '@angular/core';
import { Contact } from '../../Interfaces/contact';
import { ContactsService } from '../../service/contacts-service';

@Component({
  selector: 'app-contact-list-item',
  imports: [],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact = input.required<Contact>()
  contactsService = inject(ContactsService)
}
