import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentSearchService {
  private readonly MAX_CITIES = 8;
  private recentCities: string[] = [];

  clearSearches(): string[] {
    return this.recentCities = []
  }
  removeOneCity(i: number): any {
    this.recentCities = this.recentCities.splice(i, 1);
    return this.recentCities
  }

  getRecentCities(): string[] {
    return this.recentCities;
  }

  addCity(city: string): void {
  
    if (this.recentCities.length >= this.MAX_CITIES) {
      // Remove the oldest city if the limit is reached
      this.recentCities.pop();
    }
    if (city && !this.recentCities.includes(city)) 
    this.recentCities.unshift(city);
    // Add the new city to the end of the array
    // this.recentCities.unshift(city);
  }
}
