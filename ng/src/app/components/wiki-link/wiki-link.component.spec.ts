import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiLinkComponent } from './wiki-link.component';

describe('WikiLinkComponent', () => {
  let component: WikiLinkComponent;
  let fixture: ComponentFixture<WikiLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
