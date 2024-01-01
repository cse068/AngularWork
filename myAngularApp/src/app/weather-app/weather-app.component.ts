import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { RecentSearchService } from '../services/recent-search.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  isRotated: boolean = false;
  city: string = 'kanpur';
  weatherData: any;
  errorMessage: string = '';
  forcastData: any;

  recentSearches: string[] = [];
  // recentCities: string[];

  constructor(private weatherService: WeatherService,
    private recentSearchesService: RecentSearchService) {
    this.recentSearches = this.recentSearchesService.getRecentCities();
  }
  onSearch(query: string): void {
    this.recentSearchesService.addCity(query);
    this.recentSearches = this.recentSearchesService.getRecentCities();
  }

  ngOnInit(): void {

    // this.getWeather()
  }
  getWeather(): void {
    this.weatherService.getWeather(this.city)
      .subscribe((data) => {
        this.weatherData = data;
        this.errorMessage = '';
        this.onSearch(this.city)
        this.getForcastDay()
      }, (err) => {
        this.errorMessage = 'city not found';
})
  }
  syncSeaches(search:string){
    this.weatherService.getWeather(search).subscribe(
      (data) => {
        const location = {
          name: data.cityName,
          temperature: data.main.temp,
          weather: data.weather[0].description,
          icon: data.weather[0].icon,}
        })
    
  }

  rotateIcon() {
    this.isRotated = !this.isRotated;
  }

 
  removeCity(index: number): void {
    // Remove the location from the list
    // this.recentSearches.splice(index, 1);
    this.recentSearches = this.recentSearchesService.removeOneCity(index);
  }

  public clearSearches() {
    this.recentSearches = this.recentSearchesService.clearSearches();
    // console.log(this.recentSearches)
  }

  //methods for dayforcast
  getForcastDay(): void {

    this.weatherService.getWeatherForcast(this.city)
      .subscribe((res) => {
        this.forcastData = res
        console.log(this.forcastData)
      }
      )
  }

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString); // Convert the string to a Date object
    const dayIndex = date.getDay(); // Get the day index (0-6)
    const dayOfMonth = date.getDate(); // Get the day of the month (1-31)
    return `${dayOfMonth} ${daysOfWeek[dayIndex]}`; // Return the corresponding day from the array
  }
  weatherIcons:  any[] = [
    { condition: 'clear sky', iconPath: './../../assets/icons/animated/day.svg' },
    { condition: 'few clouds', iconPath: './../../assets/icons/animated/snowy-1.svg' },
    { condition: 'scattered clouds', iconPath: './../../assets/icons/animated/weather.svg' },
    { condition: 'broken clouds', iconPath: './../../assets/icons/animated/weather_sunset.svg' },
    { condition: 'overcast clouds', iconPath: './../../assets/icons/animated/day.svg' },
    { condition: 'shower rain', iconPath: './../../assets/icons/animated/rainy-7.svg' },
    { condition: 'rain', iconPath: './../../assets/icons/animated/rainy-2.svg' },
    { condition: 'thunderstorm', iconPath: './../../assets/icons/animated/thunder.svg' },
    { condition: 'snow', iconPath: './../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'mist', iconPath: './../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'haze', iconPath: './../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'smoke', iconPath: './../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'fog', iconPath: './../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'dust', iconPath: '../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'sand', iconPath: '../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'ash', iconPath: './../../assets/icons/animated/cloudy-night-2.svg' },
  ];

  getWeatherIconPath(weatherCondition: string | undefined): any {
    if (!weatherCondition) {
      return  '../../assets/icons/animated/cloudy-night-3.svg'; }
    const foundIcon = this.weatherIcons.find(icon => icon.condition.toLowerCase() === weatherCondition.toLowerCase());
    return foundIcon ? foundIcon.iconPath : '../../assets/icons/animated/cloudy-night-3.svg';
    }
formatTemperature(temp: number): string {
  // Convert temperature to Celsius and round to two decimal places
  const celsius = temp - 273.15;
  return celsius.toFixed(2);
}
}