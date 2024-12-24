import { Component, inject } from '@angular/core';
import { EditMoveService } from '../../services/edit-move.service';
import { NgIf } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-template5',
  standalone: true,
  imports: [NgIf,CdkDrag],
  templateUrl: './template5.component.html',
  styleUrl: './template5.component.scss'
})
export class Template5Component {
  selectedColor: string = '#ff5733'; // Default color
  backgroundColor: string = '#ff5733';
  edit: boolean = true;
  delete: boolean = false;
  droppedData: string = '';
  editMoveServie = inject(EditMoveService)

  ngOnInit() {
    console.log(this.edit)
    this.editMoveServie.edit$.subscribe((data: boolean) => {
      this.edit = data;
      // console.log(data)
      console.log("Contacts")
      console.log(this.edit)
    })

    this.editMoveServie.delete$.subscribe((data: boolean) => {
      this.delete = data;
    })

  }

  onDragStart(event: DragEvent): void {
    const element = event.target as HTMLElement;
    event.dataTransfer?.setData('text', element.innerText);
    console.log("Drag Start")  // Store the text content to be dropped
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();  // This is necessary to allow the drop action
    console.log("Drag Over")
  }

  // Handle the drop event and run a custom function
  onDrop(event: DragEvent): void {
    event.preventDefault();  // Prevent default behavior (e.g., opening as link)

    // Get the dropped data (the text) from the event
    const data = event.dataTransfer?.getData('text') || '';  // Fallback to empty string if undefined

    // Update the dropped data and target div's ID
    this.droppedData = data;
    // this.targetDivId = this.targetDivId === 0 ? 1 : 0;  // Alternate between two divs for background color change

    // Call a custom function to handle the dropped data
    this.handleDroppedData(data);
    console.log("Drop")
    this.backgroundColor = data;
  }

  // Custom function to run when something is dropped
  handleDroppedData(data: string): void {
    console.log('Dropped data:', data);  // Log the dropped text to the console

  }


  handleDelete(event: Event) {
    const button = event.target as HTMLButtonElement;
    const contactDiv = button.closest('.template5');
    if (contactDiv) {
      contactDiv.remove();
    }
  }

}
