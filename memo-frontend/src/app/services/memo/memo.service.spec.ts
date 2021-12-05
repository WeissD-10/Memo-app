import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IEnvironment } from 'src/app/interfaces/environment';
import { EnvironmentService } from '../environment/environment.service';
import { MemoService } from './memo.service';

describe('MemoService', () => {
  let service: MemoService;

  const mockEnvironment: IEnvironment = {
    apiHost: 'http://test',
    production: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MemoService,
        {provide: HttpClientTestingModule, useValue: { get: (endpoint: any) => of()} },
        { provide: EnvironmentService, useValue: mockEnvironment }
      ]
    });
    service = TestBed.inject(MemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call the HttpClient with the corrent endpoint", () => {
    const getSpy = spyOn(TestBed.inject(HttpClient), "get").and.returnValue(of());
    service.getMemos();
    expect(getSpy).toHaveBeenCalledWith(`${mockEnvironment.apiHost}/memo`)
  });
});
