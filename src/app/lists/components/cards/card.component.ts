// core
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs';
// services
import { ToastService } from '../../../shared/services/toast.service';
import { ConfirmationBoxService } from '../../../shared/services/confirmation-box.service';

@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private confirmationBoxService: ConfirmationBoxService,
    private toastService: ToastService) { }
  
  @Input()
  parentListId: string;
  @Input()
  inputCard: any;

  cardListModelSubscription: Subscription;

  ngOnInit() {
  }
  ngDestroy() {
    //this.cardListModelSubscription.unsubscribe();
  }

  confirmAndDeleteCard() {
    // this.confirmationBoxService.openConfirmationDialog(this.parentListId, this.inputCard.id, false).subscribe((isDeleteConfirmed) => {
    //   if (isDeleteConfirmed) {
    //     this.deleteCard();
    //   }
    // });
  }

  deleteCard() {
  }

  updateListInModel(parentListId: string): void {
  }
}