import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Contact, NewContact } from '../../Interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-contacts-new',
  imports: [FormsModule, Spinner],
  templateUrl: './contacts-new.html',
  styleUrl: './contacts-new.scss'
})
export class ContactsNew implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)

  errorEnBack = false;
  
  id = input<string>();
  contactoOriginal:Contact|undefined;
  
  form = viewChild<NgForm>('newContactForm');
  isLoading = false

  async ngOnInit() {
    if(this.id()){
      this.contactoOriginal = await this.contactsService.getContactById(this.id()!);

      // Cambio los valores del formulario
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company
      })
    }
  }
//* Revisa si estamos editando o creando un contacto y ejecuta la funcion correspondiente del servicio de contactos
  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
  
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        email: form.value.email,
        image: form.value.image,
        number: form.value.number,
        company: form.value.company
    };
  
    let res;
      //"const res = await this.contactsService.createContact(nuevoContacto);"
    this.isLoading = true;
    if(this.id()){
      res = await this.contactsService.editContact({...nuevoContacto,id: this.id()!.toString()})
    } else{ 
      res = await this.contactsService.createContact(nuevoContacto);
    }
    this.isLoading = false
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);  

  }
}
