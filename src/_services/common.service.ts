import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
export const API_KEY = environment.apiKey;
export const API_URL = environment.apiUrl;

export interface Options {
  language?: string;
  api_key?: string;
  watch_region?: string;
  with_watch_providers?: string;
  sort_by?: string;
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  'primary_release_date.gte'?: Date;
  'primary_release_date.lte'?: Date;
  region?: string;
  'release_date.gte'?: Date;
  'release_date.lte'?: Date;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  optionsSubject = new BehaviorSubject<Options>({
    language: 'fr-FR',
    api_key: API_KEY,
    watch_region: 'FR',
    with_watch_providers: '',
    sort_by: 'primary_release_date',
  });

  protected API_URL = API_URL;

  options$ = this.optionsSubject.asObservable();

  constructor(protected http: HttpClient) {}

  protected getOptions(): HttpParams {
    let httpParams = new HttpParams();
    this.optionsSubject.subscribe((options) => {
      (Object.keys(options) as Array<keyof Options>).forEach((option) => {
        httpParams = httpParams.set(option, String(options[option]));
        return httpParams;
      });
    });
    return httpParams;
  }

  // Méthode pour mettre à jour une option
  setOption<K extends keyof Options>(keyName: K, value: Options[K]): void {
    this.optionsSubject.next({
      ...this.optionsSubject.value,
      [keyName]: value,
    });
  }

  // Méthode pour récupérer une option
  getOption<K extends keyof Options>(keyName: K): Options[K] | null {
    return this.optionsSubject.value[keyName] || null;
  }
}
