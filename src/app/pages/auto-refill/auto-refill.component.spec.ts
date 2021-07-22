import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRefillComponent } from './auto-refill.component';

describe('AutoRefillComponent', () => {
  let component: AutoRefillComponent;
  let fixture: ComponentFixture<AutoRefillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoRefillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
