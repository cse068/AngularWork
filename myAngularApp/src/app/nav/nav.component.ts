import { Component, OnInit } from '@angular/core';
// import { CountersService } from '../service/counters.service';
import { Subscription, count } from 'rxjs';
import { CounterArrayService } from '../service/counter-array.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private arraySubscription: Subscription;
  public array: number[] = [];
  

  constructor(private counterarrayService: CounterArrayService) {
    this.array = this.counterarrayService.getCurrentArrayState();
    this.arraySubscription = this.counterarrayService.array$.subscribe((array) => {
      this.array = array;
      console.log('Array updated:', this.array);
    });
  }

  ngOnDestroy(): void {
    this.arraySubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.array =[]
    //  this.count = this.counterarrayService.counters.length
  }
}
