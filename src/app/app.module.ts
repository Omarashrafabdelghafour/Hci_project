import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { ChatComponent } from './chat/chat.component';
import { StatisticsOverviewComponent } from './statistics-overview/statistics-overview.component';
import { ListingCreationComponent } from './listing-creation/listing-creation.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedbackComponent,
    ShoppingCartComponent,
    ChatComponent,
    StatisticsOverviewComponent,
    ListingCreationComponent,
    ProfileComponent,
    SignUpComponent,
    SignInComponent,
    FilteredProductsComponent // Add the new components to declarations
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]) ,
   HttpClientModule,
    // Add AppRoutingModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
