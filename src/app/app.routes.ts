import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowLeadComponent } from './pages/show-lead/show-lead.component';
import { NoDataComponent } from './pages/no-data/no-data.component';

// export const routes: Routes = [
//     {path:'login',component:LoginComponent},
//     {path:'home',component:HomeComponent},
//     {path:'',redirectTo:'/login',pathMatch:'full'}
// ];
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '',pathMatch:'prefix', component:ShowLeadComponent},
      { path: 'no-data',pathMatch:'prefix', component: NoDataComponent },
      // { path: ':bucketId?empCode=:empId',pathMatch:'prefix', component:ShowLeadComponent},
      { path: '?bucket=:bucketId',pathMatch:'prefix', component:ShowLeadComponent},
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
