import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuantityControlComponent } from './item-quantity-control.component';

describe('ItemQuantityControlComponent', () => {
  let component: ItemQuantityControlComponent;
  let fixture: ComponentFixture<ItemQuantityControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemQuantityControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemQuantityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
