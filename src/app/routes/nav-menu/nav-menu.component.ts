import { Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BookListService } from '../../../services/book-list.service';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  private _router = inject(Router);

  onReloadPage() {
    this._router.navigate(['']);
  }
}
