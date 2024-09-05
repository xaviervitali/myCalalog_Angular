import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private backgroundColorSubject = new BehaviorSubject<string>(''); // Valeur par défaut vide
  backgroundImage$ = this.backgroundColorSubject.asObservable();

  // Méthode pour changer la couleur de fond
  setBackgroundImage(color: string) {
    this.backgroundColorSubject.next(color);
  }
}
