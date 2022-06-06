import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnSnackbarComponent } from './warn-snackbar.component';

describe('WarnSnackbarComponent', () => {
  let component: WarnSnackbarComponent;
  let fixture: ComponentFixture<WarnSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
