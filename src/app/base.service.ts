import {Injectable} from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Task,ServerResponse} from './types.factory';

@Injectable()
export class Base {
  constructor(public http: HttpClient) {
  }

  public getData(): Observable<ServerResponse> {
    return this.http.get('assets/data.json').pipe(
      map(res => <ServerResponse>res)
    );
  }
}
