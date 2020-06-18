import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsEnCoursComponent } from './contrats-en-cours.component';

describe('ContratsEnCoursComponent', () => {
  let component: ContratsEnCoursComponent;
  let fixture: ComponentFixture<ContratsEnCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratsEnCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
