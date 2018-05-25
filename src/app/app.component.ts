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
  public tasks: Task[];
  private draggableItem;
  public statuses = [
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
  private statusesArray: string[] = [];

  constructor(public base: Base) {
  }

  ngOnInit() {
    this.base.getData().subscribe(res => {
      this.tasks = res.response.tasks;
    });
    for (const status of this.statuses) {
      this.statusesArray.push(status.name);
    }
  }

  public dateParse(date) {
    return Date.parse(date);
  }

  public dragStart(event) {
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.id);
    this.draggableItem = event.target;
  }

  public drop(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    const taskId = event.dataTransfer.getData('text/plain');
    this.tasks.find(item => item.id === taskId).status = event.target.closest('.bin').id;
  }

  public dragEnd(event) {
    event.target.style.opacity = 1;
    console.log('end', event);
  }

  public dragOver(event) {
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
