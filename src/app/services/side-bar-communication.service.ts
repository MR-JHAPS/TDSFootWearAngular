import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarCommunicationService {

 showSideBar : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showSideBar$: Observable<boolean> = this.showSideBar.asObservable() ;



  toggleSideBar() : void {
    this.showSideBar.next(!this.showSideBar);
  }


}
