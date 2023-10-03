import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionEditDataComponent } from './function-edit-data.component';

describe('FunctionEditDataComponent', () => {
  let component: FunctionEditDataComponent;
  let fixture: ComponentFixture<FunctionEditDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionEditDataComponent]
    });
    fixture = TestBed.createComponent(FunctionEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
