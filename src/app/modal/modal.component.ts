import {Component, OnInit} from '@angular/core';
import {Task} from '../types.factory';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  host: {
    '(document:keyup)': 'listenEsc($event)',
  },
})
export class ModalComponent implements OnInit {
  task: Task;

  constructor() {
  }

  ngOnInit() {
    this.task = new Task();
  }

  public showModal(choisedTask) {
    document.querySelector('.modal').classList.add('show');
    this.task = choisedTask;
    document.body.classList.add('no-scroll');
  }

  public hideModal() {
    document.querySelector('.modal').classList.remove('show');
  }

  public dateParse(date) {
    return Date.parse(date);
  }

  listenEsc(event) {
    if (event.keyCode === 27) {
      this.hideModal();
    }
  }
}
