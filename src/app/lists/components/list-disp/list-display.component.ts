import { Store } from '@ngrx/store';
import { ConfirmationBoxService } from './../../../shared/services/confirmation-box.service';
import { Component, Input } from '@angular/core';
import { List } from '../../list';
import * as fromList from '../../state';
import * as listActions from '../../state/list.actions';
@Component({
    selector: 'list-disp',
    templateUrl: './list-display.component.html',
    styleUrls: ['./list-display.component.scss']
})
export class ListDisplayComponent {
    constructor(private confirmationBoxService: ConfirmationBoxService,
        private store: Store<fromList.State>) {
    }
    @Input()
    lists: List[];

    confirmAndDeleteList(id: string, name: string) {
        this.confirmationBoxService.openConfirmationDialog(name, true).subscribe((isDeleteConfirmed) => {
            if (isDeleteConfirmed) {
                this.store.dispatch(new listActions.DeleteList(id));
            }
        });
    }
}
