import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  //{ path: '', component: LoginComponent },
  //{ path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  //{ path: 'show', component: ShowComponent, canActivate: [AuthGuard] },
  //{ path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  //{ path: 'update/:id', component: EditComponent, canActivate: [AuthGuard] },
  //{ path: '**', redirectTo: '' },

  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'show', component: ShowComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: EditComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
