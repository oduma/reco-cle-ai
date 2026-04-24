import { Component } from '@angular/core';
import { ChatComponent } from './features/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: '<app-chat />',
  styles: [':host { display: flex; height: 100vh; }'],
})
export class App {}
