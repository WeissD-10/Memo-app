import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { first, repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { IMemo } from '../interfaces/memo';
import { MemoService } from '../services/memo/memo.service';
import { MatDialog } from '@angular/material/dialog';
import { EditMemoDialogComponent } from './dialogue/edit-memo-dialog';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.less']
})
export class MemoComponent implements OnInit, OnDestroy {
  durationInSeconds = 5;
  memos = new Array<IMemo>();

  memoForm: FormGroup;
  repeat$: Subject<void> = new Subject<void>();
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    fb: FormBuilder,
    private memoService: MemoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) {
    this.memoForm = fb.group({
      author: ['', [Validators.required]],
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.memoService.getMemos().pipe(repeatWhen(()=> this.repeat$), takeUntil(this.destroy$)).subscribe(memos => this.memos = memos);
    this.memoForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(form => {
      const date = new Date().toISOString();
      this.memoForm.controls['date'].setValue(date,
      {
        emitEvent: false,
      });
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  onSubmit() {
    this.memoService.createMemo(this.memoForm.value).pipe(first()).subscribe(memo => {
      this.memos.push(memo);
      this.snackbar.open(`Memo mit ID${memo.id} erstellt`);
    }, error => this.snackbar.open(error));
  }
  delete(id: string) {
    this.memoService.deleteMemo(id).pipe(takeUntil(this.destroy$)).subscribe(memo => {
      this.repeat$.next();
      this.snackbar.open(`Memo mit ID${memo.id} gelöscht`);
    }, error => this.snackbar.open(error)
    )
  }

  openDialog(id: string): void {
    const memo = this.memos.find(e => e.id === id);
    const dialogRef = this.dialog.open(EditMemoDialogComponent, {
      width: '250px',
      data: memo,
    });

    dialogRef.afterClosed().subscribe((result: IMemo) => {
      result? this.updateMemo(result) : this.snackbar.open(`Fehler beim editieren`);
    });
  }
  updateMemo(memo: IMemo) {
    this.memoService.updateMemo(memo).pipe(first()).subscribe(e => {
      this.snackbar.open(`Memo mit ID${e.id} erfolgreich editiert`);
      this.repeat$.next();
    },
    error => this.snackbar.open(error)
    )
  }
}

