import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksManagerComponent } from './links-manager.component';

describe('LinksManagerComponent', () => {
  let component: LinksManagerComponent;
  let fixture: ComponentFixture<LinksManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
