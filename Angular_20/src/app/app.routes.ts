import { Routes } from '@angular/router';
import { UserTable } from './components/user-table/user-table';
import { UserDetails } from './components/user-details/user-details';

export const routes: Routes = [

    { path: '', component: UserTable },
    { path: 'user/:id', component: UserDetails }
];
