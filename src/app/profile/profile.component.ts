import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Declare the router property
  private router: Router;
  email_ = sessionStorage.getItem('email');
  
  // Inject the router in the constructor
  constructor(router: Router) {
    this.router = router; // Initialize the router property
  }

  onEditProfile() {
    console.log('Edit Profile button clicked');
  }

  onSidebarClick(event: Event, section: string) {
    event.preventDefault(); // Prevent navigation
    console.log(`Sidebar section clicked: ${section}`);
  }

  onEditListing(event: Event, listing: string) {
    event.preventDefault(); // Prevent navigation
    console.log(`Edit clicked for listing: ${listing}`);
  }

  onViewPurchaseDetails(event: Event, purchase: string) {
    event.preventDefault(); // Prevent navigation
    console.log(`View Details clicked for purchase: ${purchase}`);
  }

  onViewFeedback(event: Event, feedback: string) {
    event.preventDefault(); // Prevent navigation
    console.log(`View clicked for feedback: ${feedback}`);
  }

  navigateToFeedback() {
    this.router.navigate(['/view-feedback']); // Update this path based on your routing configuration
  }
}
