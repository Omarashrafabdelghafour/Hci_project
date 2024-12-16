import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ChatComponent } from './chat/chat.component';
import { StatisticsOverviewComponent } from './statistics-overview/statistics-overview.component';
import { ListingCreationComponent } from './listing-creation/listing-creation.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'statistics', component: StatisticsOverviewComponent },
  { path: 'listing-creation', component: ListingCreationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full'},
  {path: 'filtered-products', component: FilteredProductsComponent },
    // Add Listing Creation route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
