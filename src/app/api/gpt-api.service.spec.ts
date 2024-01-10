import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GptApiService } from './gpt-api.service';

describe('GptApiService', () => {
  let service: GptApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GptApiService],
    });

    service = TestBed.inject(GptApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
