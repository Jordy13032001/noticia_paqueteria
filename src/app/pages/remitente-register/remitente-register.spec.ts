import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitenteRegister } from './remitente-register';

describe('RemitenteRegister', () => {
  let component: RemitenteRegister;
  let fixture: ComponentFixture<RemitenteRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemitenteRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemitenteRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
