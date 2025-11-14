import { TestBed } from '@angular/core/testing';

import { Remitente } from './remitente';

describe('Remitente', () => {
  let service: Remitente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Remitente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
