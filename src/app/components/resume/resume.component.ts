import { Component, ComponentRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ContactsComponent } from "../contacts/contacts.component";
import jsPDF from 'jspdf';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { ComponentService } from '../../services/component.service';
import { NameComponent } from '../name/name.component';
import { EditMoveService } from '../../services/edit-move.service';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from '../projects/projects.component';
import { Template5Component } from '../template5/template5.component';



@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [ContactsComponent, SidebarComponent, HeaderComponent, FormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;
  
  selectedColor='#ff5733'

  constructor(){
    // this.componentService.componentClicked$.subscribe((componentName) => {
    //   this.handleComponentClick(componentName);
    // });
  }
  componentService=inject(ComponentService)

  editService=inject(EditMoveService)
  edit:boolean=true;
  delete:boolean=false;
  ngAfterViewInit(): void {
    this.componentService.componentClicked$.subscribe((componentName) => {
      this.handleComponentClick(componentName);
    });
  }

  handleComponentClick(componentName: string) {
    let componentRef: ComponentRef<any>;

    // Dynamically add the clicked component
    if (componentName === 'contacts') {
      componentRef = this.dynamicContainer.createComponent(ContactsComponent);
    } else if (componentName === 'name') {
      componentRef = this.dynamicContainer.createComponent(NameComponent);
    }
     else if (componentName === 'project') {
      componentRef = this.dynamicContainer.createComponent(ProjectsComponent);
    }
     else if (componentName === 'template5') {
      componentRef = this.dynamicContainer.createComponent(Template5Component);
    }

    console.log(`Dynamically added: ${componentName}`);
  }

  private componentRef!: ComponentRef<ContactsComponent>;


  // Method to load the ContactsComponent dynamically
 

  generatePdf() {

    const pdfJs = document.querySelector('#pdfContent') as HTMLElement;
    const contentWidth = pdfJs.offsetWidth;
    const contentHeight = pdfJs.offsetHeight;

    // Calculate scale based on the content size
    const scaleX = 210 / contentWidth;  // Scale for width (A4 width / content width)
    const scaleY = 297 / contentHeight; // Scale for height (A4 height / content height)
    const scale = Math.min(scaleX, scaleY);

    let doc = new jsPDF();

    doc.html(pdfJs, {
      callback: function (doc) {
        doc.save("newpdf.pdf");
      },
      x: 0,
      y: 0,
      // Set to full page width (A4 width)
      // height: 297, 
      // Adjust content width to fit the A4 page (A4 width minus margins)
      // height: 190
      html2canvas: {
        scale: scale // Scale down the content to fit the page if it's too large
      }
    })

    // doc.save('test.pdf')

  }


  handelEditMove(){
    
    if(this.edit==true){
      this.editService.handleEdit(false)
      this.edit=false;
    }
    else{
      this.editService.handleEdit(true)
      this.edit=true;

    }
    // console.log("Resume component")
  }

  handleDelete(){
    if(this.delete==true)
    {
      this.editService.handleDelete(false)
      this.delete=false
    }
    else{
      
      this.editService.handleDelete(true)
      this.delete=true
    }
  }

  onDragStart(event: DragEvent): void {
    const element = event.target as HTMLElement;
    event.dataTransfer?.setData('text', element.innerText);
    console.log("Drag Start")  // Store the text content to be dropped
  }

}
