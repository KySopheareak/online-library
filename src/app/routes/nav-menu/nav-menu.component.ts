import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../list/components/search-dialog/search-dialog.component';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  private _router = inject(Router);
  private _dialogService = inject(MatDialog);

  onReloadPage() {
    this._router.navigate(['']);
  }

  async onSearch() {
    this._dialogService.open(SearchDialogComponent, {
      minWidth: '70vw',
      minHeight: '90vh',
      position: {
        top: '2vh',
        left: '15vw',
      }
    }).afterClosed();
  }
}
