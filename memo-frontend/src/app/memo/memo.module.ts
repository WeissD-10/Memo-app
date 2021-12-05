import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoComponent } from './memo.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { EditMemoDialogComponent } from './dialogue/edit-memo-dialog';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MemoComponent,
    EditMemoDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
  ],
  exports: [
    MemoComponent
  ]
})
export class MemoModule { }
