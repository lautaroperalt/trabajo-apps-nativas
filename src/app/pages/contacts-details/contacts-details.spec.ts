import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDetails } from './contacts-details';

describe('ContactsDetails', () => {
  let component: ContactsDetails;
  let fixture: ComponentFixture<ContactsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
