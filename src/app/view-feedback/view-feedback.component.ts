import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css'],
})
export class ViewFeedbackComponent implements OnInit {
  feedbackList: any[] = []; // To store the list of feedback
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  // Method to load feedback data from the backend
  loadFeedback(): void {
    this.http.get<any[]>('http://localhost:5000/reviews/Get_all_review').subscribe(
      (response) => {
        this.feedbackList = response; // Store the response in the feedback list
        this.errorMessage = null; // Clear error messages if successful
      },
      (error) => {
        console.error('Error fetching feedback:', error);
        this.errorMessage = 'Could not load feedback. Please try again later.';
      }
    );
  }
}
