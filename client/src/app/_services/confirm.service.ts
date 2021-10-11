import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../_modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Xác nhận',
    message = 'Bạn có chắc chắn thực hiện điều này?',
    btnAcceptText = 'Đồng ý', btnCancelText = 'Không đồng ý'): Observable<boolean> {
      const configuration = {
        initialState: {
          title,
          message,
          btnAcceptText,
          btnCancelText
        }
      }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, configuration);
    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observer) => {
      const subsciption = this.bsModalRef.onHidden.subscribe(() =>{
        observer.next(this.bsModalRef.content.result);
        observer.complete();
      });
      
      return {
        unsubscribe() {
          subsciption.unsubscribe();
        }
      }
    }
  }
}
