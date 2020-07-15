import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationNonVgpFormComponent } from './reparation-non-vgp-form.component';

describe('ReparationNonVgpFormComponent', () => {
  let component: ReparationNonVgpFormComponent;
  let fixture: ComponentFixture<ReparationNonVgpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationNonVgpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationNonVgpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
