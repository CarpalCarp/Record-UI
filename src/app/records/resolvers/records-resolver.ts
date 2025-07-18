import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class RecordsResolver implements Resolve<any> {
  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log('RecordsResolver called');
    return [];
  };
}
