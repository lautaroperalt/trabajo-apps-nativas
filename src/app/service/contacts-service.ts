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

  async getContactById(id: string | number) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts/"+id,
    {
      headers:{
        Authorization: "Bearer " + this.AuthService.token,
      },
    });

      const resContact:Contact = await res.json();
      return resContact;
  }

async createContact(nuevoContacto:NewContact){
  const res = await fetch("https://agenda-api.somee.com/api/contacts",{
      method: "POST", //* indica que es una solicitud de crear
      headers:{
        Authorization: "Bearer "+this.AuthService.token, //* envia el TOKEN
        "Content-Type": "application/json", 
    },
      body: JSON.stringify(nuevoContacto), //* lo convierte en JSON
});
if (!res.ok){
  const createdContact = await res.json(); //* obtiene el contacto y lo convierte en una variable
  this.contacts.push(createdContact); //* lo pushea a contacts
  return createdContact;
}
  
  }
  
async editContact (contactoEditado:Contact){
  const res = await fetch("https://agenda-api.somee.com/api/contacts/"+contactoEditado.id,
    {
      method: "PUT",
      headers:{
        Authorization: "Bearer "+this.AuthService.token, //* envia el TOKEN
        "Content-Type": "application/json", 
    },
      body: JSON.stringify(contactoEditado),
});
if (!res.ok) return;
  
  /** Edita la lista actual de contacts reemplazando solamente el que editamos */
  this.contacts = this.contacts.map(contact => {
    if(contact.id === contactoEditado.id) {
    return contactoEditado;
  };
    return contact;
  });
  return contactoEditado;
}
  
  async deleteContact(id: string | number){
    const res = await fetch("https://agenda-api.somee.com/api/contacts/"+id,
    {
      method: "DELETE",
      headers:{
        Authorization: "Bearer " + this.AuthService.token,
      },
    });
    if(!res.ok) return;
    this.contacts = this.contacts.filter(contact => contact.id !== id)
    return true;
  }
  
  async setFavourite(id:string | number ){
    const res = await fetch("https://agenda-api.somee.com/api/contacts/"+id+"favourite",
    {
      method: "POST",
      headers:{
        Authorization: "Bearer " + this.AuthService.token,
      },
    });
    if(!res.ok) return;
    /** Edita la lista actual de contactos reemplzanado solamente el favorito */
    this.contacts = this.contacts.map(contact => {
      if(contact.id === id) {
        return {...contact, isFavorite: !contact.isFavourite};
      };
      return contact;
    });
    return true;
  }
}