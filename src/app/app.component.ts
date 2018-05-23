import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from './types.factory';
import {Base} from './base.service';
import {ModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild(ModalComponent)
  public modal: ModalComponent;
  tasks: Task[];
  draggableItem;
  statuses = [
    {
      name: 'reconciliation',
      rusName: 'Согласование'
    },
    {
      name: 'pending',
      rusName: 'В ожидании'
    },
    {
      name: 'development',
      rusName: 'Разработка'
    },
    {
      name: 'testing',
      rusName: 'Тестирование'
    },
    {
      name: 'correcting',
      rusName: 'Корректировки'
    },
    {
      name: 'done',
      rusName: 'Готов'
    }
  ];
  statusesArray: string[] = [];

  constructor(public base: Base) {
  }

  ngOnInit() {
    this.base.getData().subscribe(res => {
      this.tasks = res.response.tasks;
    });
    for (let status of this.statuses) {
      this.statusesArray.push(status.name);
    }
  }

  public dateParse(date) {
    return Date.parse(date);
  }

  dragStart(event) {
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.id);
    this.draggableItem = event.target;
    //console.log('start', event, event.dataTransfer.setData, event.target);
  }

  drop(event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // stops the browser from redirecting.
    }
/*    event.target.closest('.bin').classList.remove('deny');
    event.target.closest('.bin').classList.remove('allow');
    let toIndex = this.statusesArray.findIndex(item => item === event.target.closest('.bin').id),
      fromIndex = this.statusesArray.findIndex(item => item === this.draggableItem.closest('.bin').id);
    if (Math.abs(fromIndex - toIndex) > 1) {
      return;
    }*/
    const taskId = event.dataTransfer.getData('text/plain');
    this.tasks.find(item => item.id === taskId).status = event.target.closest('.bin').id;
  }

  dragEnd(event) {
    event.target.style.opacity = 1;
    console.log('end', event);
  }

  dragexit(event) {
    console.log('exit', event);
  }

  dragEnter(event) {

  }


  dragLeave(event) {
  }

  dragOver(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    const toIndex = this.statusesArray.findIndex(item => item === event.target.closest('.bin').id),
      fromIndex = this.statusesArray.findIndex(item => item === this.draggableItem.closest('.bin').id);
    if (Math.abs(fromIndex - toIndex) > 1) {
      event.dataTransfer.dropEffect = 'none';
    } else {
      event.dataTransfer.dropEffect = 'move';
    }
  }
}
