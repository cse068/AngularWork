import { Component, OnInit } from '@angular/core';
 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // private arraySubscription: Subscription;

  // public array: any[] = [];

  // constructor(private counterArray: CounterArrayService) {
  //   this.array = this.counterArray.getCurrentArrayState();
  //   this.arraySubscription = this.counterArray.array$.subscribe((array) => {
  //     this.array = array;
  //     console.log('Array updated:', this.array);
  //   });
  // }

  // ngOnInit(): void {
  //   this.array=[]
  // }
  // ngOnDestroy(): void {
  //   this.arraySubscription.unsubscribe();
  // }
}
