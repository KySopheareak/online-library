import { Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BookListService } from '../../../services/book-list.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private _bookListService = inject(BookListService);
  private _httpClient = inject(HttpClient);
  data: any[] = [];

  ngOnInit(): void {
    this._fetchList();
  }

  private async _fetchList() {
    const response = await lastValueFrom(this._bookListService.getMany());
    console.log(response);
    
    if(!response) return;
    this.data = response.list;

  }
}
