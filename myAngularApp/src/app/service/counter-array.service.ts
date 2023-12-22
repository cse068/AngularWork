import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Counter } from '../contracts/counter.interface';

@Injectable({
  providedIn: 'root'
})
export class CounterArrayService {
  private arraySubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public array$: Observable<number[]> = this.arraySubject.asObservable();

  updateArray(newArray: any[]): void {
    this.arraySubject.next(newArray);
  }
  getCurrentArrayState(): number[] {
    return this.arraySubject.getValue();
  }
  
}
