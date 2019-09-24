import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessDuringControlWorkService {
  private isWriteControlWork = false;

  setIsWriteControlWork(flag: boolean) {
    this.isWriteControlWork = flag;
  }
  getIsWriteControlWork() {
    return this.isWriteControlWork;
  }
}
