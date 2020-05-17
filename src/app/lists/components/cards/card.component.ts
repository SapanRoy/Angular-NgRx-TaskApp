import { Store } from '@ngrx/store';
import { DeleteCard } from './../../state/list.actions';
// core
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs';
// services
import { ConfirmationBoxService } from '../../../shared/services/confirmation-box.service';

import * as fromList from '../../state';
import * as listActions from '../../state/list.actions';
@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private confirmationBoxService: ConfirmationBoxService,
    private store: Store<fromList.State>) { }
  
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
    this.confirmationBoxService.openConfirmationDialog(this.inputCard.name,false) .subscribe((isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        let cardData = {listId:this.parentListId, cardId:this.inputCard.id};
        this.store.dispatch(new listActions.DeleteCard(cardData));
      }
    });
  }



  updateListInModel(parentListId: string): void {
  }
}