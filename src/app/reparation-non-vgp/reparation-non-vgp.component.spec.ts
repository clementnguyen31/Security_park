import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationNonVGPComponent } from './reparation-non-vgp.component';

describe('ReparationNonVGPComponent', () => {
  let component: ReparationNonVGPComponent;
  let fixture: ComponentFixture<ReparationNonVGPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationNonVGPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationNonVGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
