import { HttpErrorResponse } from '@angular/common/http';

export interface AsyncStatus {
  loading: boolean;
  error?: HttpErrorResponse;
}
