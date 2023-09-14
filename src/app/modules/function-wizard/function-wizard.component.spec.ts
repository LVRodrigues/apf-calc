import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionWizardComponent } from './function-wizard.component';

describe('FunctionWizardComponent', () => {
  let component: FunctionWizardComponent;
  let fixture: ComponentFixture<FunctionWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionWizardComponent]
    });
    fixture = TestBed.createComponent(FunctionWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
