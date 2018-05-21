import {Component, OnInit} from '@angular/core';
import {Task} from './types.factory';
import {Base} from './base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
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

  constructor(public base: Base) {
  }

  ngOnInit() {
    this.base.getData().subscribe(res => {
      this.tasks = res.response.tasks;
    });
  }
  dateParse(date){
    return Date.parse(date);
  }
  dragStart(event) {
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.id);
    this.draggableItem = event.target;
    // event.dataTransfer.addElement(event.target);
    console.log('start', event, event.dataTransfer.setData, event.target);
  }

  drop(event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // stops the browser from redirecting.
    }
    const elem = event.dataTransfer.getData('text/plain');
    console.log(elem);
    event.target.appendChild(document.getElementById(elem));
    console.log('drop', event, elem);
  }

  dragend(event) {
    event.target.style.opacity = 1;
    console.log('end', event);
  }

  dragexit(event) {
    console.log('exit', event);
  }

  dragEnter(event) {
    console.log('enter', event);
    const elem = this.draggableItem;
    if (elem.id === 'aaa' && event.target.classList.contains('box3')) {
      event.target.classList.add('block');
    }
  }

  dragLeave(event) {
    console.log('enter', event);
    const elem = this.draggableItem;
    if (elem.id === 'aaa' && event.target.classList.contains('box3')) {
      event.target.classList.remove('block');
    }
  }

  dragOver(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}
