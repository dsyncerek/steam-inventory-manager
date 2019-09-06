import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export abstract class BaseDataService {
  protected readonly apiUrl = environment.apiUrl;

  constructor(protected readonly http: HttpClient) {}
}
