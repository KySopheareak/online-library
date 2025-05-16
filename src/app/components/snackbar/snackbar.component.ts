import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { SnackbarEnum } from '../../../types/enums/enum-constant.enum';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        TranslateModule,
        IconButtonComponent
    ],
})
export class SnackbarComponent implements OnInit {
    progress = 100;
    private currentIntervalId!: number;

    status!: number;
    alertMessage: string = '';
    lang!: string;

    duration: number = 5000;

    private readonly enums = SnackbarEnum;

    constructor(
        public sbRef: MatSnackBarRef<SnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA)
        public data: any
    ) {
        this.sbRef.afterOpened().subscribe(
            () => {
                this.runProgressBar();
            },
            (error) => console.error(error)
        );
    }

    ngOnInit(): void {
        let message: string = this.data?.message || 'Failed to retrieve data from server!';
        this.status = this.data.status;
        if (message.includes("'token'")) {
            this.alertMessage = 'dialog.unauthorized';
        } else {
            this.alertMessage = message.includes('dialog.')
                ? message
                : message === this.enums.ADD ||
                  message === this.enums.EDIT ||
                  message === this.enums.DELETE ||
                  message === this.enums.UPDATE
                ? 'dialog.' + message
                : message;
        }
    }

    dismissWithAction(): void {
        this.cleanProgressBarInterval();
        this.sbRef.dismissWithAction();
    }

    /**
     * @param duration - in milliseconds
     */
    runProgressBar(): void {
        this.progress = 100;
        const step = 0.5;
        const intervalTime = (this.duration * step) / 100;

        this.cleanProgressBarInterval();

        this.currentIntervalId = setInterval(() => {
            this.progress -= step;

            if (this.progress <= 0) {
                this.cleanProgressBarInterval();
                this.sbRef.dismissWithAction();
            }
        }, intervalTime) as unknown as number;
    }

    cleanProgressBarInterval(): void {
        clearInterval(this.currentIntervalId);
    }

    onHover(): void {
        clearInterval(this.currentIntervalId);
    }

    onLeave(): void {
        const step = 0.5;
        const intervalTime = (this.duration * step) / 100;

        this.cleanProgressBarInterval();

        this.currentIntervalId = setInterval(() => {
            this.progress -= step;

            if (this.progress <= 0) {
                this.cleanProgressBarInterval();
                this.sbRef.dismissWithAction();
            }
        }, intervalTime) as unknown as number;
    }
}
