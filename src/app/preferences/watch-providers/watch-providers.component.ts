import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { PreferencesService } from '../../../_services/preferences.service';
import { WatchProviderResult } from '../../../_models/watch_providers';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watch-providers',
  standalone: true,
  imports: [
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './watch-providers.component.html',
  styleUrl: './watch-providers.component.css',
})
export class WatchProvidersComponent implements OnInit {
  @Output() watchProviders = new EventEmitter<WatchProviderResult[]>();
  public apiPosterPath = environment.apiPosterPath;
  public watchProvidersFormGroup = this.formBuilder.group({
    watchProviders: this.formBuilder.array([]),
  });

  get watchProvidersCount(): number {
    return this.watchProviderCheckedList().length;
  }

  get watchProvidersFormArray(): FormArray {
    return this.watchProvidersFormGroup.get('watchProviders') as FormArray;
  }

  get watchProvidersCheckedName(): string {
    return this.watchProviderCheckedList()
      .map((e: any) => e.provider_name)
      .join(', ');
  }

  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.preferencesService
      .getWatchProviders()
      .subscribe((watchProvidersApiResponse) => {
        // WatchProviders
        const watchProviders = watchProvidersApiResponse.results.sort(
          (
            watchProviderA: { display_priorities: { FR: number } },
            watchProviderB: { display_priorities: { FR: number } }
          ) =>
            watchProviderA.display_priorities.FR -
            watchProviderB.display_priorities.FR
        );
        const userWatchProviders = this.userService.getOption(
          'with_watch_providers',
          '|'
        );
        watchProviders.forEach((watchProvider: WatchProviderResult) => {
          const isChecked = !!userWatchProviders?.includes(
            String(watchProvider.provider_id)
          );

          this.watchProvidersFormArray.push(
            this.newWatchProvider(
              watchProvider.provider_id,
              watchProvider.provider_name,
              watchProvider.logo_path,
              isChecked
            )
          );
        });
        // [...this.watchProviderCheckedList()].forEach((element) => {
        //   this.watchProviders.emit(element);
        // });
      });
  }

  private watchProviderCheckedList(): WatchProviderResult[] {
    return (this.watchProvidersFormArray as FormArray).value.filter(
      (watchProvider: WatchProviderResult) => watchProvider.checked
    );
  }

  setWatchProviders() {
    const selectedWatchProvidersIds = this.watchProviderCheckedList().map(
      (watchProvider: WatchProviderResult) => watchProvider.provider_id
    );

    this.watchProviders.emit(this.watchProviderCheckedList());

    this.userService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );
  }

  private newWatchProvider(
    provider_id: number,
    provider_name: string,
    logo_path: string,
    checked: boolean
  ): FormGroup {
    return this.formBuilder.group({
      provider_id: [provider_id],
      provider_name: [provider_name],
      logo_path: [logo_path],
      checked: [checked],
    });
  }
}
