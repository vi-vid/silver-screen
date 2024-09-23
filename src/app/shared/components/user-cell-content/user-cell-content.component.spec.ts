import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCellContentComponent } from './user-cell-content.component';

describe('UserCellContentComponent', () => {
  let component: UserCellContentComponent;
  let fixture: ComponentFixture<UserCellContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCellContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCellContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
