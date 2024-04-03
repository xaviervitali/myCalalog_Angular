import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommandationsComponent } from './movie-recommandations.component';

describe('MovieRecommandationsComponent', () => {
  let component: MovieRecommandationsComponent;
  let fixture: ComponentFixture<MovieRecommandationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieRecommandationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieRecommandationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
