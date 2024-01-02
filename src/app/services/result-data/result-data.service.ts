import { Injectable } from '@angular/core';
import { Result } from '../../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ResultDataService {
  private selectedResult: Result | null = null;

  setSelectedResult(result: Result) {
    this.selectedResult = result;
  }

  getSelectedResult(): Result {
    return this.selectedResult!;
  }
}
