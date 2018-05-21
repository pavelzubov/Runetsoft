import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  dragStart(event) {
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.id);
    // event.dataTransfer.addElement(event.target);
    console.log('start', event, event.dataTransfer.setData, event.target)
  }

  drop(event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // stops the browser from redirecting.
    }
    let elem = event.dataTransfer.getData('text/plain');
    console.log(elem)
    event.target.appendChild(document.getElementById(elem));
    console.log('drop', event, elem)
  }

  dragend(event) {
    event.target.style.opacity = 1
    console.log('end', event)
  }

  dragexit(event) {
    console.log('exit', event)
  }

  dragEnter(event) {
    console.log('enter', event)
  }

  dragOver(event) {
    if (event.preventDefault) event.preventDefault();
    // console.log('over',event)
  }
}
