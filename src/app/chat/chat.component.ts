import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatList = [
    { name: 'Jack Hanks', avatar: 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000', lastMessage: 'Hello...', time: '12:35' },
    { name: 'Jane Smith', avatar: 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000', lastMessage: 'See you soon!', time: '12:20' },
  ];

  messages: { text: string, sent: boolean }[] = [];
  receivedMessageSent = false;
  errorMessage = '';

  senderEmail: string = '';  // Bind to the sender email input
  recipientEmail: string = '';  // Bind to the recipient email input

  constructor(private http: HttpClient) {}

  sendMessage(messageInput: HTMLInputElement) {
    const messageText = messageInput.value.trim();
    if (!messageText) {
      this.errorMessage = 'Message cannot be empty.';
      return;
    }

    this.errorMessage = ''; // Clear error message
    this.messages.push({ text: messageText, sent: true });
    messageInput.value = ''; // Clear input

    // Send the message to the backend
    const messageData = {
      senderEmail: this.senderEmail,  // Use the sender email from the input field
      recipientEmail: this.recipientEmail,  // Use the recipient email from the input field
      content: messageText,
    };

    this.http.post('https://restapi-omarashrafabdelghafour-omars-projects-67aea2a3.vercel.app/messages/send', messageData).subscribe({
      next: (response) => {
        console.log('Message sent successfully', response);
        // After the message is sent, simulate a received message
        if (!this.receivedMessageSent) {
          this.messages.push({ text: 'Hi there! How can I help you?', sent: false });
          this.receivedMessageSent = true;
        }
      },
      error: (error) => {
        console.error('Error sending message', error);
        this.errorMessage = 'There was an error sending your message. Please try again later.';
      }
    });
  }
}
