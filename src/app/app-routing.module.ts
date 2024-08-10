import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { EmpruntsComponent } from './emprunts/emprunts.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'catalogue/:category', component: CatalogueComponent },
  { path: 'emprunts', component: EmpruntsComponent },
  { path: 'mon-compte', component: MonCompteComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
