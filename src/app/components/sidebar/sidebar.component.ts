import { Component, ComponentRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ContactsComponent } from "../contacts/contacts.component";
import { ComponentService } from '../../services/component.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  // dynamicContainer!: ViewContainerRef;

  componentService=inject(ComponentService)

  handleClick(event:MouseEvent){
    event.preventDefault;
    let clickedElement = event.target as HTMLElement;
    // alert("Clicked")
    while (clickedElement && !clickedElement.id) {
      clickedElement = clickedElement.parentElement as HTMLElement;
    }

    // Log the ID of the closest div with an ID
    if (clickedElement && clickedElement.id) {
      console.log(`Clicked on: ${clickedElement.id}`);
      this.componentService.emitComponent(clickedElement.id)
    }
  
  
  }

}
