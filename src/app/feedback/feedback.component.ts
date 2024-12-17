import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private router: Router, private http: HttpClient) {}

  // Method to submit feedback
  submitFeedback(): void {
    if (this.feedbackText.trim() === '') {
      alert('Please enter your feedback before submitting.'); // Simple validation
      return;
    }

    // Prepare the feedback data
    const feedbackData = {
      comment: this.feedbackText,
      rating: this.selectedRating,
    };

    // Send the feedback data to the backend API
    this.http.post('http://localhost:5000/reviews/create', feedbackData).subscribe(
      (response) => {
        // Handle the response if submission is successful
        console.log('Feedback submitted:', response);

        // Store feedback received flag in local storage
        localStorage.setItem('feedbackReceived', 'true');

        // Update UI state
        this.feedbackSubmitted = true; // Set the flag to indicate feedback was submitted
        this.confirmationMessage = 'Thank you for your feedback!'; // Set confirmation message
        this.errorMessage = null; // Clear any previous error messages

        // Navigate back to the home page after a brief delay (for demonstration)
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000); // Delay for 2 seconds before navigating
      },
      (error) => {
        // Handle error if the submission fails
        console.error('Error submitting feedback:', error);
        this.errorMessage = 'There was an issue submitting your feedback. Please try again later.';
        this.confirmationMessage = null; // Clear the confirmation message
      }
    );
  }

  // Method to update the star rating
  updateStars(star: number): void {
    this.selectedRating = star; // Update the selected rating
  }
}
