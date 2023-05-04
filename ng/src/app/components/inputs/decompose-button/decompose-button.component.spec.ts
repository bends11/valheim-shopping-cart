import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomposeButtonComponent } from './decompose-button.component';

describe('DecomposeButtonComponent', () => {
  let component: DecomposeButtonComponent;
  let fixture: ComponentFixture<DecomposeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecomposeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecomposeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
