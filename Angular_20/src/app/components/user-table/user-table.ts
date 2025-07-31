import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserData } from '../../services/get-user-data';
import { Subscription } from 'rxjs';
import { User } from '../../Interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  imports: [],
  providers:[GetUserData],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable implements OnInit{
  
  private userSubscription?: Subscription;
  private router = inject(Router);
  private userService = inject(GetUserData);
  public users: User[] = [];
  public headers: string[] = [];


  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        if (data.length > 0) {
          this.headers = Object.keys(data[0]);
        }
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }

  
  navigateToUser(user: any): void {
    this.router.navigate(['/user', user.id]);
  }

  onTableRowClick(event: Event, user: any): void {
    if ((event.target as HTMLElement).tagName !== 'INPUT') {
      this.navigateToUser(user);
    }
  }

  setUserValue(event: Event, rowIndex: number, key: string): void {
    const input = event.target as HTMLInputElement;
    this.users[rowIndex][key] = input.value;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
