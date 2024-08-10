import { TestBed } from '@angular/core/testing';

import { BookCatalogueService } from './book-catalogue.service';

describe('BookCatalogueService', () => {
  let service: BookCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
