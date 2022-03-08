import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  alerts = {
    status: new Subject<{
      severity: string, errorCode: string, summary: string, detail: string,
      transactionId?: string, type?: string, sticky?: boolean
    }>(),
    show: (params: any) => {
      this.alerts.status.next(params);
    },
    hide: () => {
      this.alerts.visibility.next(false);
    },
    visibility: new Subject<boolean>(),
    setValue: (value: boolean) => {
      this.alerts.confirmationValue.next(value);
    },
    confirmationValue: new Subject<boolean>()
  };

}
