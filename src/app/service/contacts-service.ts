import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../Interfaces/contact';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  AuthService = inject(AuthService);
  contacts: Contact[] = []

  /** Obtiene los contactos del backend */
async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts", 
      {
        headers:{
          Authorization: "Bearer "+this.AuthService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
}


  getContactById(){}

async createContact(nuevoContacto:NewContact){
  const res = await fetch("https://agenda-api.somee.com/api/contacts",{
      method: "POST", //* indica que es una solicitud de crear
      headers:{
        Authorization: "Bearer "+this.AuthService.token, //* envia el TOKEN
    },
      body: JSON.stringify(nuevoContacto), //* lo convierte en JSON
});

if (res.ok){
  const createdContact = await res.json(); //* obtiene el contacto y lo convierte en una variable
  this.contacts.push(createdContact); //* lo pushea a contacts
}
  
  }
  
  editContact(){}
  deleteContact(id: string){
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }
  setFavourite(){}
}