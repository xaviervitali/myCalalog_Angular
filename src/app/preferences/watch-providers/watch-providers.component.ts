import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { PreferencesService } from '../../../_services/preferences.service';
import { WatchProviderResult } from '../../../_models/watch_providers';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { WatchProviderDialogComponent } from './watch-provider-dialog/watch-provider-dialog.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-watch-providers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './watch-providers.component.html',
  styleUrl: './watch-providers.component.css',
})
export class WatchProvidersComponent implements OnInit {
  @Output() watchProviders = new EventEmitter<WatchProviderResult[]>();
  public apiPosterPath = environment.apiPosterPath;
  _selectedProviders: any[] = [];

  get watchProvidersCount(): number {
    return this.userSelectedWP.length;
  }

  public watchProviderFilter: string = '';
  public watchProvidersApiResponse: any = null;

  private userSelectedWP: string[] = [];
  providerCtrl = new FormControl();
  filteredProviders!: Observable<any[]>;

  get selectedProviders() {
    return this._selectedProviders.sort((providerA, providerB) =>
      providerA.provider_name.localeCompare(providerB.provider_name)
    );
  }

  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.preferencesService
      .getWatchProviders()
      .subscribe((watchProvidersApiResponse) => {
        this.watchProvidersApiResponse = watchProvidersApiResponse.results.sort(
          (
            watchProviderA: { display_priorities: { FR: number } },
            watchProviderB: { display_priorities: { FR: number } }
          ) =>
            watchProviderA.display_priorities.FR -
            watchProviderB.display_priorities.FR
        );
        this.filteredProviders = this.providerCtrl.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? value : value.provider_name
          ),
          map((name) =>
            name
              ? this._filterProviders(name)
              : this.watchProvidersApiResponse.slice()
          )
        );
        this.getUserWatchProvidersIds();
        this.userSelectedWP.forEach((providerId) => {
          const provider = this.watchProvidersApiResponse.find(
            (provider: WatchProviderResult) =>
              provider.provider_id === +providerId
          );
          this.selectedProviders.push(provider);
          this.filteredProviders = this.filteredProviders.pipe(
            map((providers) => providers.filter((p) => p !== provider))
          );
        });
        this.watchProviders.emit(this.selectedProviders);
      });
  }
  private _filterProviders(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.watchProvidersApiResponse.filter(
      (provider: any) =>
        provider.provider_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addProvider(provider: any): void {
    this.selectedProviders.push(provider);
    this.filteredProviders = this.filteredProviders.pipe(
      map((providers) => providers.filter((p) => p !== provider))
    );
    this.providerCtrl.setValue('');
    this.setWatchProviders();
  }

  removeSelectedProvider(selectedProvider: WatchProviderResult) {
    const dialogRef = this.dialog.open(WatchProviderDialogComponent, {
      maxWidth: 800,
      disableClose: true,
      data: selectedProvider,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.selectedProviders.indexOf(selectedProvider);

        if (index !== -1) {
          this.selectedProviders.splice(index, 1);
          this.filteredProviders = this.filteredProviders.pipe(
            map((providers) =>
              [...providers, selectedProvider].sort(
                (a, b) => a.display_priorities.FR - b.display_priorities.FR
              )
            )
          );
          this.setWatchProviders();
        }
      }
    });
  }

  public setWatchProviders() {
    const selectedWatchProvidersIds = this.selectedProviders.map(
      (wp: any) => wp.provider_id
    );

    this.userService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );

    this.getUserWatchProvidersIds();
    this.watchProviders.emit(this.selectedProviders);
  }

  private getUserWatchProvidersIds() {
    this.userSelectedWP = this.userService.getOption(
      'with_watch_providers',
      '|'
    ) as string[];
  }
}
