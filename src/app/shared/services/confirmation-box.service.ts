import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ConfirmationBoxComponent } from '../components/confirmation-box/confirmation-box.component';
@Injectable()
export class ConfirmationBoxService {
    constructor(private http: HttpClient,
        public dialog: MatDialog) {
    }
    openConfirmationDialog(entityName: string, isList: boolean): Observable<any> {
        const yesNoDialog = this.dialog.open(ConfirmationBoxComponent, {
            data: {
                title: `Delete ${isList ? 'List' : 'Card'}-${entityName}`,
                message: `${isList ? 'This action will delete list and all tasks.':'This action will delete card.'} Are you sure?`,
            },
            height: '200px',
            width: '400px',
            disableClose: true
        });
        return yesNoDialog.afterClosed();

    }
}

