import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatTabsModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule, MatSnackBarModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { UppercaseDirective } from './uppercase.directive';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    FooterComponent,
    AboutComponent,
    UppercaseDirective,
    SnackbarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatTabsModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatToolbarModule, MatRadioModule, MatStepperModule,FormsModule,
  ChartsModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCzqvv7MkNQvA-ZqAR6i1nYWlKs3cYV_zE',
    libraries: ["places"]
  })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
