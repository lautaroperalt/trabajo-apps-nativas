import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { ContactsNew } from './pages/contacts-new/contacts-new';
import { ContactsDetails } from './pages/contacts-details/contacts-details';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: 'register',
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: '',
        component: LoggedLayout,
        canActivateChild: [onlyLoggedUserGuard],
        children: [
            {
                path: '',
                component: ContactsPage
            },
            {
                path: 'contacts/new',
                component: ContactsNew
            },
            {
                path: 'contacts/:id',
                component: ContactsDetails
            },
            {   path: 'contacts/:id/edit',
                component: ContactsNew
            }
        ]
    },
];