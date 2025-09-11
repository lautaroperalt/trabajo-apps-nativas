export interface User {
    id:string,
    /** Nombre del Usuario */
    firstName:string,
    /** Apellido del Usuario */
    lastName: string,
    email: string,
    password: string
}

export type NewUser = Omit<User,"id">;