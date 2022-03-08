import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DogsListComponent } from './components/dogs/dogs-list/dogs-list.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { BlockUIModule } from 'ng-block-ui';
import { MenuComponent } from './components/menu/menu.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertsComponent,
    HomeComponent,
    DogsListComponent,
    ConfirmationDialogComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
