import { Injectable } from '@angular/core';
import { ApiOptions } from '../_models/apiOptions';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userParameters : Partial<ApiOptions> = {
  };

  // Méthode pour mettre à jour une option
  setOption<K extends keyof ApiOptions>(
    keyName: K,
    value: ApiOptions[K]
  ): void {
    this.userParameters[keyName] = value
    const userParameters = JSON.stringify(this.userParameters)
    localStorage.setItem('userParameters', userParameters)
  }

  // Méthode pour récupérer une option
  getOption<K extends keyof ApiOptions>(
    keyName: K,
    separator = ''
  ) {
    let optionValue: any = this.userParameters[keyName];

    if (!optionValue) {
      return null;
    }

    if (!!separator && typeof optionValue === 'string') {
      optionValue = optionValue.split(separator);
    }
    return optionValue;
  }

  // removeOption(optionKey: keyof ApiOptions): void {
  //   const currentValue = this.optionsSubject.getValue(); // Obtenir la valeur actuelle
  //   if (optionKey in currentValue) {
  //     delete currentValue[optionKey]; // Supprimer la clé de la valeur actuelle
  //     this.optionsSubject.next(currentValue); // Émettre la nouvelle valeur mise à jour
  //   }
  // }
  // constructor(private http: HttpClient, private auth: AuthService) {}
  // create(user: User) {
  //   return this.http.post<User>(environment.apiUrl + '/users', user);
  // }

  // update(user: User) {
  //   return this.http.put<User>(environment.apiUrl + '/users/' + user.id, user);
  // }

  // clearCache(){

  // }
}
