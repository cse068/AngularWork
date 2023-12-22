import { Component } from '@angular/core';
import { CounterArrayService } from '../service/counter-array.service';
interface Counter {
  value: number;
}
@Component({
  selector: 'app-counter-app',
  templateUrl: './counter-app.component.html',
  styleUrls: ['./counter-app.component.scss']
})
export class CounterAppComponent {
 
constructor(private countArray:CounterArrayService){}
counters: any[] = [];


  addCounter(): void {
    this.counters.push({ value: 0 });
    this.countArray.updateArray(this.counters)
  }

  resetCounters(): void {
    this.counters = [];
    this.countArray.updateArray(this.counters)
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
    this.countArray.updateArray(this.counters)
  }
  
  ngOnDestroy(): void {
    this.counters =[]
    this.countArray.updateArray(this.counters)
     
  }
}
