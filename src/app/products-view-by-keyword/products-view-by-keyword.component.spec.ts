import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewByKeywordComponent } from './products-view-by-keyword.component';

describe('ProductsViewByKeywordComponent', () => {
  let component: ProductsViewByKeywordComponent;
  let fixture: ComponentFixture<ProductsViewByKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsViewByKeywordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewByKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
