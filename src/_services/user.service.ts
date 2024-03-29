import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject } from 'rxjs';
import { ApiOptions } from '../_models/apiOptions';

export const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  optionsSubject = new BehaviorSubject<ApiOptions>({
    language: 'fr-FR',
    api_key: API_KEY,
    watch_region: 'FR',
    append_to_response: 'release_dates',
    sort_by: 'popularity.desc',
    certification_country: 'FR',
  });

  // Méthode pour mettre à jour une option
  setOption<K extends keyof ApiOptions>(
    keyName: K,
    value: ApiOptions[K]
  ): void {
    this.optionsSubject.next({
      ...this.optionsSubject.value,
      [keyName]: value,
    });
  }

  // Méthode pour récupérer une option
  getOption<K extends keyof ApiOptions>(keyName: K): ApiOptions[K] | null {
    return this.optionsSubject.value[keyName] || null;
  }

  removeOption(optionKey: keyof ApiOptions): void {
    const currentValue = this.optionsSubject.getValue(); // Obtenir la valeur actuelle
    if (optionKey in currentValue) {
      delete currentValue[optionKey]; // Supprimer la clé de la valeur actuelle
      this.optionsSubject.next(currentValue); // Émettre la nouvelle valeur mise à jour
    }
  }
}
