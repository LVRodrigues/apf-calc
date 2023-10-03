import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataDialogComponent } from './edit-data-dialog.component';

describe('EditDataDialogComponent', () => {
  let component: EditDataDialogComponent;
  let fixture: ComponentFixture<EditDataDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDataDialogComponent]
    });
    fixture = TestBed.createComponent(EditDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
