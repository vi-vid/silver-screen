import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridScreenComponent } from './grid-screen.component';

describe('GridScreenComponent', () => {
  let component: GridScreenComponent;
  let fixture: ComponentFixture<GridScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
