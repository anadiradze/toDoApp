import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class LoggerServiceService {
  constructor() {}
  disableLogsinProd() {
  /*   if (environment.production) {
      console.log = function (): void {};
    } */
  }
}
