import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogPayload,
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  openConfirmationDialog(message: string): Observable<boolean> {
    return this.dialog
      .open<ConfirmationDialogComponent, ConfirmationDialogPayload, boolean>(ConfirmationDialogComponent, {
        width: '500px',
        data: { message },
      })
      .afterClosed()
      .pipe(filter(res => res));
  }
}
