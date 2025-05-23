import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BookListService } from '../../../../../services/book-list.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-dialog',
  imports: [
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss'
})
export class SearchDialogComponent {
  private _bookService = inject(BookListService);
  searchCtrl = new FormControl('');
  data: any[] = [];

  async onSearch(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const searchValue = this.searchCtrl.value;
    let dataJson: any = {
      title: searchValue,
    }
    const response = await lastValueFrom(this._bookService.getMany(dataJson));
    if(!response) return;
    this.data = response.data;
    console.log('RESPONSE', response);
  }
}
