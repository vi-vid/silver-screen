import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCellContentComponent } from './movie-cell-content.component';

describe('MovieCellContentComponent', () => {
  let component: MovieCellContentComponent;
  let fixture: ComponentFixture<MovieCellContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCellContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCellContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
