import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Contact, NewContact } from '../../Interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts-new',
  imports: [FormsModule, RouterModule],
  templateUrl: './contacts-new.html',
  styleUrl: './contacts-new.scss'
})
export class ContactsNew implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  
  idContacto = input<number>();
  contactoOriginal:Contact|undefined = undefined;
  form = viewChild<ElementRef<Form>>('newContactForm');

  async ngOnInit() {
    if(this.idContacto()){
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
      console.log(this.contactoOriginal)
    }
  }

  async createContact(form:NgForm){
    this.errorEnBack = false;
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        email: form.value.email,
        image: form.value.image,
        number: form.value.number,
        company: form.value.company,
        isFavourite: form.value.isFavorite
    }
  
    const res = await this.contactsService.createContact(nuevoContacto);
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);
  }
}
