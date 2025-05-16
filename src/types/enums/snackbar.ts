import { ComponentType } from '@angular/cdk/portal';
import { SnackbarEnum } from './enum-constant.enum';


type SnackBarMessageType = `${SnackbarEnum}`;

export interface ISnackbar {
  message: SnackBarMessageType | string;
  component?: ComponentType<any>;
}
