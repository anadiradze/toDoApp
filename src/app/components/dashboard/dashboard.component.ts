import { Component } from '@angular/core';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private modalService: ModalServiceService) { }

  showModal() {
    this.modalService.openModal()
  }
  isModalServiceVisible(): boolean {
    return this.modalService.showModal;
  }
}
