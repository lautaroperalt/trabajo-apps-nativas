import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsNew } from './contacts-new';

describe('ContactsNew', () => {
  let component: ContactsNew;
  let fixture: ComponentFixture<ContactsNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
