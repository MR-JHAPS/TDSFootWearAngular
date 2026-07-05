import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


//this service is responsible to update the status if the data is deleted/updated.
export class DataRefreshService {
 private refreshSource = new Subject<void>();

  refresh$ = this.refreshSource.asObservable();

  refresh() {
    console.log("Refresh Emitted");
    this.refreshSource.next();
  }
}
