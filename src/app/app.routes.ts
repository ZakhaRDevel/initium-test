import { Routes } from '@angular/router';
import { recordsResolver } from './core/resolvers/records.resolver';
import { PagesComponent } from './pages/pages.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        resolve: {
            records: recordsResolver
        }
    },
  { path: 'error', component: ErrorComponent }
];
