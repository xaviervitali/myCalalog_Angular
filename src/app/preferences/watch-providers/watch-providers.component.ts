import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { PreferencesService } from '../../../_services/preferences.service';
import { WatchProvider as WatchProvider } from '../../../_models/watch_providers';
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
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  startWith,
} from 'rxjs';
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
  public selectedProviders: WatchProvider[] = [];
  @Output() watchProvidersChange = new EventEmitter<WatchProvider[]>();
  @Input() userWatchProviders!: string;

  filteredOptions!: Observable<WatchProvider[]>;

  public apiPosterPath = environment.apiPosterPath;

  get watchProvidersCount(): number {
    return this.selectedProviders.length;
    // return this.userSelectedWP.length;
  }

  public watchProviderFilter: string = '';

  providerCtrl = new FormControl();
  availableProviders_: WatchProvider[] = [];

  get availableProviders() {
    const filteredProviders = this.availableProviders_.filter(
      (provider) => !this.selectedProviders.includes(provider)
    );
    return filteredProviders;
  }
  constructor(
    private preferencesService: PreferencesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.providerCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filter(name as string)
          : this.availableProviders.slice();
      })
    );

    this.preferencesService
      .getWatchProviders()
      .subscribe((watchProvidersApiResponse) => {
        this.availableProviders_ = watchProvidersApiResponse;
        this.availableProviders; // relance la liste
      });
  }

  private _filter(value: string): WatchProvider[] {
    const filterValue = value.toLowerCase();

    return this.availableProviders.filter((option: WatchProvider) =>
      option.provider_name.toLowerCase().includes(filterValue)
    );
  }
  
  addProvider(provider: any): void {
    this.selectedProviders.push(provider);
    this.providerCtrl.setValue('');
    this.watchProvidersChange.emit(this.selectedProviders);
  }

  removeSelectedProvider(selectedProvider: WatchProvider) {
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
        }
      }
      this.watchProvidersChange.emit(this.selectedProviders);
    });
  }
}
