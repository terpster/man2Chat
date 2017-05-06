import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { HttpModule} from '@angular/http';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ChatService]
    });
  });

  it('should ...', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
