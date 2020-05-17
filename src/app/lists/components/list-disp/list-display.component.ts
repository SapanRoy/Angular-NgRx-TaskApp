// core
import { Component, Input, SimpleChanges } from '@angular/core';
// angular material
import { MatDialog } from '@angular/material';
// ngrx
import { Store } from '@ngrx/store';
// drag-drop
import { CdkDragDrop } from '@angular/cdk/drag-drop';
// state
import * as fromList from '../../state';
// action
import * as listActions from '../../state/list.actions';
// config
import { AppConfig } from '../../../config/app.config';
// entity
import { List } from '../../list';
import { Card } from '../cards/card';
// service
import { ConfirmationBoxService } from './../../../shared/services/confirmation-box.service';
// component
import { NewCardComponent } from './../cards/card-new/card-new.component.component';

@Component({
    selector: 'list-disp',
    templateUrl: './list-display.component.html',
    styleUrls: ['./list-display.component.scss'],
})
export class ListDisplayComponent {
    constructor(private confirmationBoxService: ConfirmationBoxService,
        private store: Store<fromList.State>,
        private dialog: MatDialog) {
    }

    @Input()
    lists: List[];
    
    // reference confirmation model
    dialogRef: any;

    // for drag-drop 
    listsConnectedTo = Array<String>();

    ngOnInit() {
        this.listsConnectedTo = new Array<string>();
    }

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "lists" changed
        if (changes['lists']) {
             // generate ids of lists for drag and drop`
            this.lists.map(list => {
                this.listsConnectedTo.push(list.id);
            });
        }
    }

    confirmAndDeleteList(id: string, name: string): void {
        this.confirmationBoxService.openConfirmationDialog(name, true).subscribe((isDeleteConfirmed) => {
            if (isDeleteConfirmed) {
                this.store.dispatch(new listActions.DeleteList(id));
            }
        });
    }
    openAddCardDialog(list: List): void {
        this.dialogRef = this.dialog.open(NewCardComponent,
            {
                data: list.name,
                height: AppConfig.ModelHeight,
                width: AppConfig.ModelWidth,
            });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Ok') {
                let card: Card = { id: null, name: result.data.name, parentListId: list.id };
                this.creatCard(card);
            }
        });
    }
    creatCard(card: Card): void {
        this.store.dispatch(new listActions.CreateCard(card));
    }
    onCardDrop(data: CdkDragDrop<string[]>): void {
        let sourceList = JSON.parse(JSON.stringify(data.previousContainer.data));
        let targetList = JSON.parse(JSON.stringify(data.container.data));
        let draggedCard = data.item.data;
        if (sourceList.id == targetList.id) {
            return;
        }
        let cardData = { 'sourceListId': sourceList.id, 'targetListId': targetList.id, "cardId": draggedCard.id };
        this.store.dispatch(new listActions.MoveCard(cardData));
    }
}
