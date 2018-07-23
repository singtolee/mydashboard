import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressProfileComponent } from './user-address-profile.component';

describe('UserAddressProfileComponent', () => {
  let component: UserAddressProfileComponent;
  let fixture: ComponentFixture<UserAddressProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
