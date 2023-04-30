import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {
  http = inject(HttpClient);
  readonly VALHEIM_WIKI_BASE_URL = 'https://valheim.fandom.com';
}
