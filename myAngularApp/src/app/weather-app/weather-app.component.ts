import { Component } from '@angular/core';
import { WeatherDataService } from '../service/weather-data.service';
import { ForecastData, WeatherIcon } from './../contracts/weather.interface'

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent {
  cityName: string = 'kanpur';
  recentLocations: any[] = [];
  selectedLocation: { city: string; forecast: ForecastData, icon: string, temperature: number, wind: { speed: string, pressure: number }, weather: string } | undefined;
  errorMessage: string = '';

  constructor(private weatherService: WeatherDataService) { }

  ngOnInit(): void {
    this.getForecast('DefaultCity');
  }

  //Adding and fetching
  addCity(): void {
    if (!this.cityName.trim()) {
      if (this.cityName == "")
        this.errorMessage = `Please enter city name!`;
      this.clearErrorMessage();
      return;
    }

    this.weatherService.getWeather(this.cityName).subscribe(
      (data) => {
        const location = {
          name: this.cityName,
          temperature: data.main.temp,
          weather: data.weather[0].description,
          icon: data.weather[0].icon,
        };

        if (this.recentLocations.length >= 8) {
          this.recentLocations.pop();
        }
        this.recentLocations.unshift(location);
        this.cityName = '';
        this.getForecast(location.name);
      },
      (error) => {
        this.errorMessage = `City name not found. Please try again.`;
        this.clearErrorMessage();
      }
    );
  }

  // get day my week and date
  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);  
    const dayIndex = date.getDay();  
    const dayOfMonth = date.getDate();  
    return `${dayOfMonth} ${daysOfWeek[dayIndex]}`;  
  }

  // refresh weather 
  refreshWeather(location: any): void {
    this.addCity()
  }

  //Removing recent search
  removeLocation(index: number): void {
    this.recentLocations.splice(index, 1);
    if (this.recentLocations.length > 0) {
      this.selectedLocation = {
        city: this.recentLocations[0].name,
        forecast: this.recentLocations[0].forecast,
        temperature: this.recentLocations[0].temperature,
        weather: this.recentLocations[0].weather,
        icon: this.recentLocations[0].icon,
        wind: this.recentLocations[0].wind,
      };
    }
    else {
      this.selectedLocation = undefined;
    }
  }

  //Get forecart
  getForecast(city: string): void {
    this.weatherService.getForecast(city).subscribe(
      (data: ForecastData) => {
        this.weatherService.getWeather(city).subscribe(
          (weatherData) => {
            const location = {
              city,
              forecast: data,
              temperature: weatherData.main.temp,
              weather: weatherData.weather[0].description,
              icon: weatherData.weather[0].icon,
              wind: {
                speed: weatherData.wind.speed,
                degree: weatherData.wind.deg,
                pressure: weatherData.main.pressure
              }
            };
            this.selectedLocation = location;
          });
      }
    );
  }


  clearLocations(): void {
    this.recentLocations = [];
    this.selectedLocation = undefined;
  }


  castToForecastDay(data: any): ForecastData {
    return data as ForecastData;
  }

  formatTemperature(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(2);
  }
  // Adjusting icons 
  weatherIcons: WeatherIcon[] = [
    { condition: 'clear sky', iconPath: '../../assets/icons/animated/day.svg' },
    { condition: 'few clouds', iconPath: '../../assets/icons/animated/snowy-1.svg' },
    { condition: 'scattered clouds', iconPath: '../../assets/icons/animated/weather.svg' },
    { condition: 'broken clouds', iconPath: '../../assets/icons/animated/weather_sunset.svg' },
    { condition: 'overcast clouds', iconPath: '../../assets/icons/animated/day.svg' },
    { condition: 'shower rain', iconPath: '../../assets/icons/animated/rainy-7.svg' },
    { condition: 'rain', iconPath: '../../assets/icons/animated/rainy-2.svg' },
    { condition: 'thunderstorm', iconPath: '../../assets/icons/animated/thunder.svg' },
    { condition: 'snow', iconPath: '../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'mist', iconPath: '../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'haze', iconPath: '../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'smoke', iconPath: '../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'fog', iconPath: '../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'dust', iconPath: '../../assets/icons/animated/cloudy-night-2.svg' },
    { condition: 'sand', iconPath: '../../assets/icons/animated/cloudy-night-3.svg' },
    { condition: 'ash', iconPath: '../../assets/icons/animated/cloudy-night-2.svg' },
  ];

  getWeatherIconPath(weatherCondition: string | undefined): string {
    if (!weatherCondition) {
      return '';
    }

    const foundIcon = this.weatherIcons.find(icon => icon.condition.toLowerCase() === weatherCondition.toLowerCase());

    return foundIcon ? foundIcon.iconPath : '';
  }
  //Refrest weather data already fetched
  refreshWeatherData(cityName: string): void {
    this.getForecast(cityName)
  }

  onRefreshButtonClick(cityName: string): void {
    this.refreshWeatherData(cityName);
  }

  //remove err
  clearErrorMessage(): void {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

}
