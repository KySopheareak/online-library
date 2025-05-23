import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BookListService } from '../../../../services/book-list.service';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import { StaticFilePipe } from '../../../pipes/static-file.pipe';
import { SafePipe } from '../../../pipes/safe.pipe';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogReaderComponent } from '../components/dialog-reader/dialog-reader.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [StaticFilePipe, SafePipe],
})
export class ListComponent implements OnInit {
  private _bookListService = inject(BookListService);
  private _cdr = inject(ChangeDetectorRef);
  private _dialogService = inject(MatDialog);

  staticFilePipe = inject(StaticFilePipe);
  data: any[] = [];
  previewUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    this._fetchList();
  }

  private async _fetchList() {
    const response = await lastValueFrom(this._bookListService.getMany());
    if(!response) return;
    this.data = response.data;
    this._cdr.markForCheck();
  }

  async onClick(id: string) {
    this._dialogService.open(DialogReaderComponent, {
      minWidth: '70vw',
      minHeight: '90vh',
      disableClose: true,
      data: {
        id
      },
    }).afterClosed();
  }
}
