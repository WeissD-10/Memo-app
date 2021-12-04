import { Injectable } from '@angular/core';
import { IEnvironment } from '../../interfaces/environment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService implements IEnvironment {

  get production() {
    return environment.production;
  }

  get apiHost() {
    return environment.apiHost;
  }
}
