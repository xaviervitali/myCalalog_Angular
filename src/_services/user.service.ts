import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject } from 'rxjs';
import { ApiOptions } from '../_models/apiOptions';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

// export const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  optionsSubject = new BehaviorSubject<Partial<ApiOptions>>({
    language: 'fr-FR',
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
  constructor(private http: HttpClient, private auth: AuthService) {}
  create(user: User) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  update(user: User) {
    return this.http.put<User>(environment.apiUrl + '/users/' + user.id, user);
  }

  clearCache(){

  }
}
