import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PreferencesService } from '../../../_services/preferences.service';
import { WatchProvider } from '../../../_models/watch_providers';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-watch-providers',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './watch-providers.component.html',
  styleUrl: './watch-providers.component.css',
})


export class WatchProvidersComponent implements OnInit {
public watchProviders : any[] = [];
public apiPosterPath =  environment.apiPosterPath;
public length =20
@Output() watchProviderSelectedEmitter = new EventEmitter(false)

get selectedWatchProvider() {
  return this.watchProviders.filter(watchProvider=> watchProvider.isActive).map(watchProvider=>watchProvider.provider_id)
}

  constructor(private preferencesService: PreferencesService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.preferencesService.getMoviesWatchProviders().subscribe(watchProviders=> this.watchProviders = watchProviders.map(watchProvider=>({...watchProvider, isActive :false})))
  }


  swithWatchProviderStatus(currentWatchProvider:any){
    this.watchProviders.find(watchProvider=>watchProvider === currentWatchProvider).isActive = !currentWatchProvider.isActive
    this.userService.setOption('with_watch_providers', this.selectedWatchProvider.join('|'))
    
  }

  moreProvider(){
    if(this.length < this.watchProviders.length){
      this.length += 20
    }
  }
  handleSubmit(){
    this.watchProviderSelectedEmitter.emit(true)
  }
}
