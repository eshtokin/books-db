import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { RouteGuard } from './guard/route.guard';
import { CatalogComponent } from './shared/catalog/catalog.component';
import { DbViewerComponent } from './admin/db-viewer/db-viewer.component'

const authRoutes: Routes = [
  {path: 'login', component: AuthFormLoginComponent},
  {path: 'registr', component: AuthFormRegComponent}
];

const routes: Routes = [
  {path: 'auth', component: AuthFomrComponent},
  {path: 'auth', component: AuthFomrComponent, children: authRoutes},
  {path: 'catalog', component: CatalogComponent},
  {path: 'dbviewer', component: DbViewerComponent},
  {path: 'user-manager', component: UserTableComponent, canActivate: [RouteGuard]},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }