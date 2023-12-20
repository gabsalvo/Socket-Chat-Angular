import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent {
  @Input() username: string | null = 'default';
  chatOpen: boolean = false;

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
  }
}
