import { TestBed } from '@angular/core/testing';

import { TaskSeviceService } from './task-sevice.service';

describe('TaskSeviceService', () => {
  let service: TaskSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
