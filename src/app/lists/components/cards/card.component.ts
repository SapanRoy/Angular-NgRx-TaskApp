// core
import { Component, Input } from '@angular/core';
// ngrx
import { Store } from '@ngrx/store';
// services
import { ConfirmationBoxService } from '../../../shared/services/confirmation-box.service';
// state
import * as fromList from '../../state';
// reducer
import * as listActions from '../../state/list.actions';
@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(private confirmationBoxService: ConfirmationBoxService,
    private store: Store<fromList.State>) { }
  
  @Input()
  parentListId: string;
  @Input()
  inputCard: any;

  confirmAndDeleteCard() {
    this.confirmationBoxService.openConfirmationDialog(this.inputCard.name,false) .subscribe((isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        let cardData = {listId:this.parentListId, cardId:this.inputCard.id};
        this.store.dispatch(new listActions.DeleteCard(cardData));
      }
    });
  }
}