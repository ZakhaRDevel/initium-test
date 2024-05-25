import { Routes } from '@angular/router';
import { recordsResolver } from './core/resolvers/records.resolver';
import { PagesComponent } from './pages/pages.component';
import { ErrorComponent } from './pages/error/error.component';
import { RecordsComponent } from './pages/records/records.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: RecordsComponent,
        resolve: {
          records: recordsResolver
        }
      }
    ]
  },
  { path: 'error', component: ErrorComponent }
];
