import { Component, inject, input } from '@angular/core';
import { Contact } from '../../Interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact = input.required<Contact>()
  contactsService = inject(ContactsService)
}
