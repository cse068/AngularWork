import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiForcastKey='1f035051095bc1b6f1d881bbcfc14dd3'
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiForcastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient) { }
  // https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}
  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
  getWeatherForcast(city:string): Observable<any> {
    const url = `${this.apiForcastUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
