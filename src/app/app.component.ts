import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeComponent } from "./components/resume/resume.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ResumeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ResumeBuilder';
}
