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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-watch-providers',
  standalone: true,
  imports: [
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
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
    return this.userSelectedWP.length;
  }

  get watchProvidersFormArray(): FormArray {
    return this.watchProvidersFormGroup.get('watchProviders') as FormArray;
  }

  get watchProvidersCheckedName(): string {
    return this.watchProviderCheckedList()
      .map((e: any) => e.provider_name)
      .join(', ');
  }

  public watchProviderFilter: string = '';
  private watchProvidersApiResponse: any = null;

  private userSelectedWP: string[] = [];

  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.preferencesService
      .getWatchProviders()
      .subscribe((watchProvidersApiResponse) => {
        this.watchProvidersApiResponse = watchProvidersApiResponse;
        // WatchProviders
        const watchProviders = watchProvidersApiResponse.results.sort(
          (
            watchProviderA: { display_priorities: { FR: number } },
            watchProviderB: { display_priorities: { FR: number } }
          ) =>
            watchProviderA.display_priorities.FR -
            watchProviderB.display_priorities.FR
        );
        this.getUserWatchProvidersIds();

        watchProviders.forEach((watchProvider: WatchProviderResult) => {
          const isChecked = this.userSelectedWP?.includes(
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
        this.setWatchProviders();
      });
  }

  private watchProviderCheckedList(): any {
    console.log(this.userSelectedWP);

    return this.watchProvidersApiResponse.results.filter((e: any) =>
      this.userSelectedWP.includes(String(e.provider_id))
    );
  }

  public setWatchProviders() {
    const selectedWatchProvidersIds = this.watchProvidersFormArray.value
      .filter((wp: any) => !!wp.checked)
      .map((wp: any) => wp.provider_id);

    this.userService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );

    this.getUserWatchProvidersIds();
    this.watchProviders.emit(this.watchProviderCheckedList());
  }

  private getUserWatchProvidersIds() {
    this.userSelectedWP = this.userService.getOption(
      'with_watch_providers',
      '|'
    ) as string[];
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

  handleWatchProviderFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();

    this.watchProvidersFormArray.clear();

    const filteredProviders = this.watchProvidersApiResponse.results.filter(
      (provider: WatchProviderResult) =>
        provider.provider_name.toLowerCase().includes(filterValue)
    );

    filteredProviders.forEach((watchProvider: WatchProviderResult) => {
      const isChecked = this.userSelectedWP?.includes(
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
  }

  public onWatchProviderCheckboxChange(event: any, watchProviderId: number) {
    const selectedWatchProvidersIds = this.watchProvidersFormArray.value
      .filter((wp: any) => wp.checked)
      .map((wp: any) => wp.provider_id);

    if (event.checked) {
      this.userSelectedWP.push(watchProviderId.toString());
    } else {
      const index = this.userSelectedWP.indexOf(watchProviderId.toString());
      if (index > -1) {
        this.userSelectedWP.splice(index, 1);
      }
    }
    this.userService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );
    console.log(this.userService.getOption('with_watch_providers', '|'));
    this.watchProviders.emit(this.watchProviderCheckedList());
  }
}
