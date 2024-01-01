import { Component } from '@angular/core';
// import {Counter} from './../contract/counterContract'
interface Counter {
  value: number;
}
@Component({
  selector: 'app-counter-app',
  templateUrl: './counter-app.component.html',
  styleUrls: ['./counter-app.component.scss']
})
export class CounterAppComponent {
  counters: Counter[] = [];


  addCounter(): void {
    this.counters.push({ value: 0 });
  }

  resetCounters(): void {
    this.counters = [];
    // console.log(this.counters[0])
}

  incrementCounter(index: number): void {
    this.counters[index].value++;
  }

  decrementCounter(index: number): void {
    if (this.counters[index].value > 0) {
      this.counters[index].value--;
    }
  }

  deleteCounter(index: number): void {
    this.counters.splice(index, 1);
  }

}
