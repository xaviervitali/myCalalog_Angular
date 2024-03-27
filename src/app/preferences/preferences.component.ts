import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../_services/preferences.service';
import { forkJoin } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Result } from '../../_models/watch_providers';
import { environment } from '../../environment/environment';
import { CommonService } from '../../_services/common.service';
import { DiscoverService } from '../../_services/discover.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
})
export class PreferencesComponent implements OnInit {
  //public watchProviders: any = [];

  public formGroup = this.formBuilder.group({
    watchProviders: this.formBuilder.array([]),
  });

  public apiPosterPath = environment.apiPosterPath;

  get watchProvidersFormArray(): FormArray {
    return this.formGroup.get('watchProviders') as FormArray;
  }

  constructor(
    private preferencesService: PreferencesService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private discoverService: DiscoverService
  ) {}

  ngOnInit(): void {
    forkJoin({
      watchProviders: this.preferencesService.getProviders(),
    }).subscribe((results) => {
      const watchProviders = results.watchProviders.results.sort(
        (
          watchProviderA: { provider_name: string },
          watchProviderB: { provider_name: string }
        ) =>
          watchProviderA.provider_name.localeCompare(
            watchProviderB.provider_name
          )
      );

      watchProviders.forEach((watchProvider: Result) => {
        let isChecked = false;
        this.preferencesService
          .getOption('with_watch_providers')
          .subscribe((withWatchProviders) => {
            if (withWatchProviders) {
              const watchProvidersIds = withWatchProviders.split('|');
              isChecked = watchProvidersIds.includes(
                String(watchProvider.provider_id)
              );
              // Faites ce que vous devez avec isChecked...
            }
          });
        this.watchProvidersFormArray.push(
          this.newWatchProvider(
            watchProvider.provider_id,
            watchProvider.provider_name,
            watchProvider.logo_path,
            isChecked
          )
        );
      });
    });
  }

  private newWatchProvider(
    provider_id: number,
    provider_name: string,
    logo_path: string,
    checked: boolean
  ): FormGroup {
    return this.formBuilder.group({
      provider_id,
      provider_name,
      logo_path,
      checked: checked,
    });
  }

  setWatchProviders() {
    const selectedWatchProviders = this.watchProvidersFormArray.value.filter(
      (watchProvider: any) => watchProvider.checked
    );

    const selectedWatchProvidersIds = selectedWatchProviders.map(
      (watchProvider: Result) => watchProvider.provider_id
    );

    this.commonService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );

    console.log(
      this.commonService.getOptions(),
      this.discoverService.getOptions()
    );
  }
}
