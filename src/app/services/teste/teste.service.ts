import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TesteService {
  constructor(private http: HttpClient) {}

  async getValue(): Promise<string> {
    return 'OK';
  }
}
