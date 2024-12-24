import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }

  private componentClickSubject=new Subject<string>();

  componentClicked$=this.componentClickSubject.asObservable();

  emitComponent(componentName:string){
    this.componentClickSubject.next(componentName);
  }


}
