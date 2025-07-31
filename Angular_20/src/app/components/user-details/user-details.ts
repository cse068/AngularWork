import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetUserData } from '../../services/get-user-data';
import { UserData } from '../../Interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  providers:[GetUserData],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private userService = inject(GetUserData);
  private userSub?: Subscription;
  public user: UserData | undefined;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userSub = this.userService.getUsers().subscribe({
        next: (data) => {
          this.user = data.find((u) => u.id == id);
        },
        error: (err) => {
          console.error('Failed to fetch users:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
