import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IMemo } from 'src/app/interfaces/memo';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-edit-memo',
  templateUrl: 'edit-memo-dialog.html',
})
export class EditMemoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMemoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMemo,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
