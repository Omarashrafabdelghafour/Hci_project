import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbackText: string = '';
  feedbackSubmitted: boolean = false;
  selectedRating: number = 0; // Initialize to 0 to avoid null
  confirmationMessage: string | null = null; // Initialize the confirmation message
  errorMessage: string | null = null; // Initialize the error message

  constructor(private router: Router) {}

  // Method to submit feedback
  submitFeedback(): void {
    if (this.feedbackText.trim() === '') {
      alert('Please enter your feedback before submitting.'); // Simple validation
      return;
    }

    // Simulate a feedback submission without an API call
    console.log('Feedback submitted:', {
      message: this.feedbackText,
      rating: this.selectedRating,
    });

    // Store feedback received flag in local storage
    localStorage.setItem('feedbackReceived', 'true');

    // Simulate successful feedback submission
    this.feedbackSubmitted = true; // Set the flag to indicate feedback was submitted
    this.confirmationMessage = 'Thank you for your feedback!'; // Set confirmation message
    this.errorMessage = null; // Clear any previous error messages

    // Navigate back to the home page after a brief delay (for demonstration)
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000); // Delay for 2 seconds before navigating
  }

  // Method to update the star rating
  updateStars(star: number): void {
    this.selectedRating = star; // Update the selected rating
  }
}
