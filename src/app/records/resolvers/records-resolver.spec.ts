import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recordsResolverResolver } from './records-resolver';

describe('recordsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => recordsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
