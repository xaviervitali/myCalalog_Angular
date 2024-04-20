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
    with_watch_providers: '337|8|119',
    with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
    with_origin_country:
      'IN|US|CN|JP|FR|GB|DE|KR|IR|ES|IT|TR|RU|AR|MX|BR|AU|CA|EG|PL|NL|TW|SE|IL|BE|DK|NO|AT|CH|FI|GR|HK|HU|ID|IE|MY|NZ|PH|PT|RO|SA|SG|TH|UA|VN|ZA|AE|AL|AM|AZ|BA|BD|BG|CL|CO|CZ|DO|EC|EE|GE|IQ|JO|KE|KZ|LB|LT|LV|MA|MK|MT|NG|PE|PK|PR|QA|SK|SI|SR|TN|UY|VE|XK',
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
  getOption<K extends keyof ApiOptions>(
    keyName: K,
    separator = ''
  ): ApiOptions[K] | null | string[] {
    let optionValue: any = this.optionsSubject.value[keyName];

    if (!optionValue) {
      return null;
    }

    if (!!separator && typeof optionValue === 'string') {
      optionValue = optionValue.split(separator);
    }
    return optionValue;
  }

  removeOption(optionKey: keyof ApiOptions): void {
    const currentValue = this.optionsSubject.getValue(); // Obtenir la valeur actuelle
    if (optionKey in currentValue) {
      delete currentValue[optionKey]; // Supprimer la clé de la valeur actuelle
      this.optionsSubject.next(currentValue); // Émettre la nouvelle valeur mise à jour
    }
  }
}
