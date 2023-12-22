export interface ForecastDay {
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string; // Assuming 'icon' is a property in the weather object
    }[];
}
export interface WeatherIcon {
    condition: string;
    iconPath: string;
}
export interface ForecastData {
    list: ForecastDay[];
}

export interface Weather {
    condition: string;
    iconPath: string;
}