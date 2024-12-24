import { Component, inject } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { EditMoveService } from '../../services/edit-move.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CdkDrag, NgIf, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  edit: boolean = true;
  delete?: boolean;
  editMoveServie = inject(EditMoveService)
  color: string = '#ff0000'

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




  handleDelete(event: Event) {
    const button = event.target as HTMLButtonElement;
    const contactDiv = button.closest('.contact');
    if (contactDiv) {
      contactDiv.remove();
    }
  }


  

  selectedColor: string = '#ff5733'; // Default color
  backgroundColor: string ='#ff5733';

  // When a color is selected, update the background color
  // onColorChange() {
  //   this.backgroundColor = this.selectedColor;
  // }

  droppedData: string = '';  // Store dropped data (text)
  // targetDivId: number = 0;   // Track which div was dropped on

  // This function triggers when the drag starts (on the draggable div)
  onDragStart(event: DragEvent): void {
    const element = event.target as HTMLElement;
    event.dataTransfer?.setData('text', element.innerText);
    console.log("Drag Start")  // Store the text content to be dropped
  }

  // Prevent the default behavior to allow drop
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
    this.backgroundColor=data;
  }

  // Custom function to run when something is dropped
  handleDroppedData(data: string): void {
    console.log('Dropped data:', data);  // Log the dropped text to the console
  
  }

}
