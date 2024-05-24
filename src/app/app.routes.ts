import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { recordsResolver } from './core/resolvers/records.resolver';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        resolve: {
            records: recordsResolver
        }
    }
];
