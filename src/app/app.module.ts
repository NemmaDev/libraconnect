import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministrationComponent } from './administration/administration.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCategoriesComponent } from './book-categories/book-categories.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CommentsPreviewComponent } from './comments-preview/comments-preview.component';
import { EmpruntsComponent } from './emprunts/emprunts.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './service/authservice.service';
import { BookCatalogueService } from './service/book-catalogue.service';
import { BookService } from './service/book.service';
import { NewsletterService } from './service/newsletter.service';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    BookCategoriesComponent,
    CommentsPreviewComponent,
    CatalogueComponent,
    EmpruntsComponent,
    MonCompteComponent,
    AdministrationComponent,
    LoginComponent,
    RegisterComponent,

    ForgotPasswordComponent,
     FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgbModule,
    NgbModalModule,

  ],
  providers: [BookCatalogueService,AuthService,BookService,UserService,NewsletterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
