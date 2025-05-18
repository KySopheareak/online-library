import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
    providedIn: 'root',
})
export class BookListService extends BaseCrudService<any> {
    constructor() {
        super();
        this.path = '/books';
    }
}
