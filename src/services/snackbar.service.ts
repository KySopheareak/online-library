import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../app/components/snackbar/snackbar.component';
import { ISnackbar } from '../types/enums/snackbar';


@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    success(data: ISnackbar) {
        this.snackBar.openFromComponent(data?.component ?? SnackbarComponent, {
            data: {
                message: data.message,
                status: 1,
            },
            panelClass: ['snackbar-success', 'snackbar-custom'],
        });
    }

    error(data: ISnackbar) {
        this.snackBar.openFromComponent(data?.component ?? SnackbarComponent, {
            data: {
                message: data.message,
                status: 0,
            },
            panelClass: ['snackbar-error', 'snackbar-custom'],
        });
    }
}
