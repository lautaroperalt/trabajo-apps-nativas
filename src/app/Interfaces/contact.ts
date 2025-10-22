export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    image: string,
    number: string,
    company: string,
    isFavorite?: boolean //Es opcional (?) porque no todos los contactos van a ser favoritos
}
/** Interfaz que es igual a Contact pero sin ID */
export type NewContact = Omit<Contact,"id">;