import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RotationServiceService {

  constructor(
    private httpService: HttpServiceService
    ) { }
  

}
