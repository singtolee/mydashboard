import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdListComponent } from './prd-list.component';

describe('PrdListComponent', () => {
  let component: PrdListComponent;
  let fixture: ComponentFixture<PrdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
