import { TestBed } from '@angular/core/testing';

import { EditMoveService } from './edit-move.service';

describe('EditMoveService', () => {
  let service: EditMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
