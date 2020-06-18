import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsCompletComponent } from './contrats-complet.component';

describe('ContratsCompletComponent', () => {
  let component: ContratsCompletComponent;
  let fixture: ComponentFixture<ContratsCompletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratsCompletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsCompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
