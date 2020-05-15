// core
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
// rxjs
import { Subscription } from 'rxjs';
import { ConfirmationBoxService } from '../shared/services/confirmation-box.service';
import { NewCardComponent } from './components/cards/card-new/card-new.component.component';

@Component({
  selector: 'component-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input()
  inputList: any;

  cardListModelSubscription: Subscription;
  listsConnectedTo = Array<String>();

  constructor(
    private dialog: MatDialog,
    private confirmationBoxService: ConfirmationBoxService,
  ) {
  }
  ngOnInit() {
  }
  confirmAndDeleteList(id: string) {
    this.confirmationBoxService.openConfirmationDialog(id, null, true).subscribe((isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        this.deleteList(id);
      }
    });
  }
  deleteList(id: string) {
  }
  // fecth all lists and broadcast
  updateCardListModel() {
  }
  openAddCardDialog() {
    this.dialog.open(NewCardComponent, {
      data: {
        list: this.inputList
      },
      height: '200px',
      width: '250px',
    });
  }

  onCardDrop(data: CdkDragDrop<string[]>): void {
    let sourceList = JSON.parse(JSON.stringify(data.previousContainer.data));
    let targetList = JSON.parse(JSON.stringify(data.container.data));
    let draggedCard = data.item.data;
    if (sourceList.id == targetList.id) {
      return;
    }
  }
}