import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModuleDialogComponent } from './module-dialog.component';

describe('NewModuleDialogComponent', () => {
  let component: NewModuleDialogComponent;
  let fixture: ComponentFixture<NewModuleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewModuleDialogComponent]
    });
    fixture = TestBed.createComponent(NewModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
