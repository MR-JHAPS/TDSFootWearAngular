import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


//this service is responsible to update the status if the data is deleted/updated.
export class DataRefreshService {
 private refreshSource = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSource.asObservable();

  refresh() {
    console.log("Refresh Emitted");
    this.refreshSource.next();
  }
}
