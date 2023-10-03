import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionEditTransactionComponent } from './function-edit-transaction.component';

describe('FunctionEditTransactionComponent', () => {
  let component: FunctionEditTransactionComponent;
  let fixture: ComponentFixture<FunctionEditTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionEditTransactionComponent]
    });
    fixture = TestBed.createComponent(FunctionEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
