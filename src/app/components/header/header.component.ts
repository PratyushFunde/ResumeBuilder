import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  onDragStart(event: DragEvent): void {
    const element = event.target as HTMLElement;
    event.dataTransfer?.setData('text', element.innerText);
    console.log("Drag Start")  // Store the text content to be dropped
  }
}
