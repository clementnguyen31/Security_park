import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginsLongueDureeComponent } from './engins-longue-duree.component';

describe('EnginsLongueDureeComponent', () => {
  let component: EnginsLongueDureeComponent;
  let fixture: ComponentFixture<EnginsLongueDureeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginsLongueDureeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginsLongueDureeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
