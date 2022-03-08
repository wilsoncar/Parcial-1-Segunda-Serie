import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [MessageService]
})
export class AlertsComponent implements OnInit, OnDestroy {

  alertsSubscription$: Subscription;
  visibilitySubscription$: Subscription;
  visibleConfirmMessage: any;
  interval: any;

  constructor(
    private readonly utilsService: UtilsService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.alertsSubscription$ = this.utilsService.alerts.status
      .subscribe((params: any) => {
        const messageObj = {
          severity: params.severity,
          summary: params.summary,
          detail: params.detail,
          transactionId: undefined,
          errorCode: undefined,
          sticky: false
        };
        if (params.transactionId) {
          messageObj.transactionId = params.transactionId;
        }
        if (params.errorCode) {
          messageObj.errorCode = params.errorCode;
        }
        this.messageService.clear();
        this.messageService.add(messageObj);
        this.startTimer();
      });
  }

  startTimer() {
    this.visibilitySubscription$ = this.utilsService.alerts.visibility.subscribe(v => {
      this.visibleConfirmMessage = v;
    });
  }

  ngOnDestroy(): void {
    if (this.alertsSubscription$) {
      this.alertsSubscription$.unsubscribe();
    }
    if (this.visibilitySubscription$) {
      this.visibilitySubscription$.unsubscribe();
    }
  }

}
