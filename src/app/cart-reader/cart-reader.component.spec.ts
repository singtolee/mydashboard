import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartReaderComponent } from './cart-reader.component';

describe('CartReaderComponent', () => {
  let component: CartReaderComponent;
  let fixture: ComponentFixture<CartReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
