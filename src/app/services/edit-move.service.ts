import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditMoveService {

  constructor() { }
  // move:boolean=false;
  
  private editSubject=new BehaviorSubject<boolean>(true)
  edit$=this.editSubject.asObservable()
  
  private deleteSubject=new BehaviorSubject<boolean>(false)
  delete$=this.deleteSubject.asObservable()

  handleEdit(data:boolean){
    this.editSubject.next(data)
  }


  handleDelete(data:boolean){
    this.deleteSubject.next(data)
  }

}
