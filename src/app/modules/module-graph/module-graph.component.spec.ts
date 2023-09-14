import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGraphComponent } from './module-graph.component';

describe('ModuleGraphComponent', () => {
  let component: ModuleGraphComponent;
  let fixture: ComponentFixture<ModuleGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleGraphComponent]
    });
    fixture = TestBed.createComponent(ModuleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
