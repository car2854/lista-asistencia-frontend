import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginEstudianteComponent } from './login-estudiante/login-estudiante.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'login-estudiante', component: LoginEstudianteComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/main', pathMatch: 'full'},
      { path: '**', redirectTo: '/main' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
