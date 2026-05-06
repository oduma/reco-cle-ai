import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface GeoResponse {
  latitude: string;
  longitude: string;
  city?: string;
  country?: string;
}

interface WeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

@Injectable({ providedIn: 'root' })
export class GeoWeatherService {
  readonly locationLabel   = signal<string | null>(null);
  readonly locationContext = signal<string | null>(null);
  readonly weatherContext  = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      const geo = await firstValueFrom(
        this.http.get<GeoResponse>('https://geo.kamero.ai/api/geo'),
      );

      const city    = validPart(geo.city);
      const country = validPart(geo.country);
      const parts   = [city, country].filter(Boolean) as string[];

      if (parts.length > 0) {
        this.locationLabel.set(parts.join(', '));
        this.locationContext.set(`The user is located in ${parts.join(', ')}.`);
      }

      const lat = parseFloat(geo.latitude);
      const lon = parseFloat(geo.longitude);

      const weather = await firstValueFrom(
        this.http.get<WeatherResponse>(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        ),
      );

      const cw   = weather.current_weather;
      const temp = interpretTemperature(cw.temperature);
      const wind = interpretWindspeed(cw.windspeed);
      const code = interpretWeatherCode(cw.weathercode);

      this.weatherContext.set(
        `Outside it is ${code}, there is ${wind} and as temperature is ${temp}`,
      );
    } catch {
      // Silently fail — app works without geo/weather
    }
  }
}

function validPart(value: string | undefined): string | null {
  if (!value || value.trim() === '' || value.trim().toLowerCase() === 'undefined') return null;
  return value.trim();
}

function interpretTemperature(t: number): string {
  if (t <= 3)  return 'Very Cold';
  if (t <= 6)  return 'Cold';
  if (t <= 10) return 'Chill';
  if (t <= 15) return 'Normal';
  if (t <= 20) return 'Nice';
  if (t <= 28) return 'Warm';
  if (t <= 35) return 'Hot';
  return 'Burning hot';
}

function interpretWindspeed(w: number): string {
  if (w <= 15)  return 'no wind';
  if (w <= 30)  return 'a light wind';
  if (w <= 50)  return 'windy';
  if (w <= 100) return 'a strong wind';
  return 'a hurricane';
}

function interpretWeatherCode(code: number): string {
  if (code === 0)                     return 'a clear sky';
  if (code >= 1  && code <= 3)        return 'partly cloudy';
  if (code >= 45 && code <= 48)       return 'fog';
  if (code >= 51 && code <= 57)       return 'drizzling';
  if (code >= 61 && code <= 65)       return 'raining';
  if (code >= 71 && code <= 75)       return 'snowing';
  if (code >= 80 && code <= 82)       return 'raining';
  if (code >= 85 && code <= 86)       return 'snowing';
  if (code >= 95 && code <= 99)       return 'a thunderstorm';
  return 'partly cloudy';
}
