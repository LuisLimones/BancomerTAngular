import { TestBed } from '@angular/core/testing';

import { BancaService } from './banca.service';

describe('BancaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BancaService = TestBed.get(BancaService);
    expect(service).toBeTruthy();
  });
});
