import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyVacationComponent } from './apply-vacation.component';

describe('ApplyVacationComponent', () => {
  let component: ApplyVacationComponent;
  let fixture: ComponentFixture<ApplyVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyVacationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
