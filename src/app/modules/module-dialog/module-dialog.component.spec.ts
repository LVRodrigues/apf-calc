import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDialogComponent } from './module-dialog.component';

describe('ModuleDialogComponent', () => {
  let component: ModuleDialogComponent;
  let fixture: ComponentFixture<ModuleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleDialogComponent]
    });
    fixture = TestBed.createComponent(ModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
