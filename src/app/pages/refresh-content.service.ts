import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshContentService {
    private refreshTrigger = new Subject<void>(); 
    refreshTriggered$ = this.refreshTrigger.asObservable(); 
  
    triggerRefresh() {
      this.refreshTrigger.next(); 
    }
}
