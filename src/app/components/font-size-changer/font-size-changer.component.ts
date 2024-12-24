import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-font-size-changer',
  standalone: true,
  imports: [NgFor,NgStyle ],
  templateUrl: './font-size-changer.component.html',
  styleUrl: './font-size-changer.component.scss'
})
export class FontSizeChangerComponent {
  fontSizes: number[] = [12, 14, 16, 18, 20, 24, 28, 32];
  selectedFontSize: number = this.fontSizes[2]; // Default: 16px

  onFontSizeChange(event: Event): void {
    this.selectedFontSize = +(event.target as HTMLSelectElement).value;
  }
}
